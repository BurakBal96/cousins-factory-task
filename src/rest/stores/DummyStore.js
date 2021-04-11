import {action, computed, makeObservable, observable} from 'mobx'
import {BasicModel as Model, BasicMeta as Meta} from '../models'

const mockData = {
  meta: {
    count: 9,
    total: 25000,
  },
  items: [],
}

export default class DummyStore {
  state = 'pending' // "pending" / "fetching", "done" / "error"
  meta = {}
  _list = new observable.map()

  constructor(Stores) {
    this.stores = Stores

    makeObservable(this, {
      _list: observable,
      state: observable,
      meta: observable,

      list: computed,

      read: action,

      fetchSuccess: action.bound,
      handleError: action.bound,
    })
  }

  read({id, params = {}}) {
    // if (id) {
    //   this.state = 'getting'
    //   Service.detail({id, params, client_id}).then(res => {
    //     this._item = new Model(res.item || {})
    //     this.state = 'done'
    //   }, this.handleError)
    // } else {
    this.state = 'listing'
    // Service.read({params, client_id}).then(
    //   this.fetchSuccess,
    //   this.handleError
    // )
    this.fetchSuccess(mockData)
    // }
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
