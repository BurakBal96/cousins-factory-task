import {action, computed, makeObservable, observable, toJS} from 'mobx'
import {InvoiceModel as Model, InvoiceMeta as Meta} from '../models'
import {InvoiceServices as Service} from "../services"

export default class InvoiceStore {
  _list = new observable.map()
  _item = {}
  state = 'pending' // "listing" / "getting", "done" / "error"
  detailState = 'detailState' // "listing" / "getting", "done" / "error"
  meta = {}

  constructor(Stores) {
    this.stores = Stores

    makeObservable(this, {
      _list: observable,
      _item: observable,
      state: observable,
      detailState: observable,
      meta: observable,

      list: computed,
      item: computed,

      read: action,

      fetchSuccess: action.bound,
      handleError: action.bound,
    })
  }

  read({id, params = {}}) {
    if (id) {
      this.detailState = 'getting'
      Service.detail({id, params}).then(res => {
        this._item = new Model(res.item || {})
        this.detailState = 'done'
      }, this.handleError)
    } else {
      this.state = 'listing'
      return Service.read({params}).then(this.fetchSuccess, this.handleError)
    }
  }

  fetchSuccess(res) {
    if (res.items)
      res.items.forEach(i => {
        const item = new Model(i || {})
        this._list.set(item.id, item)
      })
    if (res.meta) this.meta = new Meta(res.meta)
    this.state = 'done'
    return res;
  }

  handleError(error) {
    this.state = 'error'
    return this.stores.SystemMessageStore.handleError(error)
  }

  get list() {
    return [...this._list.values()]
  }

  get item() {
    return toJS(this._item)
  }
}
