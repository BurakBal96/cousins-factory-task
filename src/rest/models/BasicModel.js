export class Meta {
  constructor(data) {
    if (data) Object.entries(data).forEach(([k, i]) => (this[k] = i))
  }
}

export class BasicModel {
  constructor(data) {
    if (data) Object.entries(data).forEach(([k, i]) => (this[k] = i))
  }

  // get id() {
  //   return this['id']
  // }
}
