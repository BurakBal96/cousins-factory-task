import SystemMessageStore from './SystemMessageStore'
import InvoiceStore from './InvoiceStore'

class RootStore {
  constructor() {
    this.SystemMessageStore = new SystemMessageStore(this)
    this.InvoiceStore = new InvoiceStore(this)
  }
}

export const stores = new RootStore()
