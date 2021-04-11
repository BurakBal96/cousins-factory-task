import {action, computed, makeObservable, observable} from 'mobx'
import {InvoiceModel as Model, InvoiceMeta as Meta} from '../models'
import {InvoiceServices as Service} from "../services"

export default class InvoiceStore {
  _list = new observable.map()
  _item = {}
  state = 'pending' // "pending" / "fetching", "done" / "error"
  meta = {}

  constructor(Stores) {
    this.stores = Stores

    makeObservable(this, {
      _list: observable,
      _item: observable,
      state: observable,
      meta: observable,

      list: computed,

      read: action,

      fetchSuccess: action.bound,
      handleError: action.bound,
    })
  }

  read({id, params = {}}) {
    if (id) {
      this.state = 'getting'
      Service.detail({id, params}).then(res => {
        this._item = new Model(res.item || {})
        this.state = 'done'
      }, this.handleError)
    } else {
      this.state = 'listing'
      Service.read({params}).then(this.fetchSuccess, this.handleError)
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
  }

  handleError(error) {
    this.state = 'error'
    return this.stores.SystemMessageStore.handleError(error)
  }

  get list() {
    return [...this._list.values()]
  }
}
