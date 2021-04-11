import {action, computed, makeObservable, observable} from 'mobx'
import {SystemMessage as Model} from '../models'

export default class {
  newRelease = false
  _list = []

  constructor(Stores) {
    this.stores = Stores
    makeObservable(this, {
      newRelease: observable,
      _list: observable.deep,
      list: computed,
      news: computed,
      add: action,
    })
  }

  get list() {
    return this._list
  }

  get news() {
    return this.list.filter(i => i.isDisplayed === false)
  }

  add(doc) {
    const item = new Model(doc)
    const legacy = this._list.filter(i => i.createdAt === doc.createdAt)
    if (legacy.length) {
      if (JSON.stringify(item) !== JSON.stringify(legacy[0]))
        this._list.push(item)
    } else this._list.push(item)
  }

  handleError({code, message}) {
    this.add({status: 400, code, message, createdAt: new Date()})
    return false
  }
}
