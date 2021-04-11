const currencies = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£"
}

export class Meta {
    constructor(data) {
        if (data) Object.entries(data).forEach(([k, i]) => (this[k] = i))
    }
}

export class InvoiceModel {
    constructor(data) {
        if (data) Object.entries(data).forEach(([k, i]) => (this[k] = i))
    }

    get currencySign(){
        return currencies[this["currency"] || "USD"]
    }
}
