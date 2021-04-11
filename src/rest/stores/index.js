import SystemMessageStore from './SystemMessageStore'

class RootStore {
  constructor() {
    this.SystemMessageStore = new SystemMessageStore(this)
  }
}

export const stores = new RootStore()
