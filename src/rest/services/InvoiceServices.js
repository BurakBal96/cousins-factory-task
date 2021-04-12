import {sleep} from 'helpers'

const mockData = {
  meta: {
    count: 9,
    offset: 0,
    total: 15655,
  },
  items: [
    {
      id: 'invoice0',
      description: 'First mock invoice',
      status: 'outstanding',
      note: 'This invoice will be paid in cash before the due date',
      taxIncludedPrice: '1180',
      totalPrice: '1000',
      tax: 0.18,
      currency: 'USD',
      date: '2021-04-11T12:28:15.299Z',
      dueDate: '2021-04-29T12:28:15.299Z',
      requiredMaterialList: [
        {name: 'External Network Card', price: 100, totalPrice: 100, amount: 1},
        {name: 'Batch of Paper', price: 25, totalPrice: 100, amount: 4},
        {
          name: 'Outsource Frontend',
          hoursOfWork: 12,
          price: 800,
          totalPrice: 800,
        },
        {name: 'mock1', price: 0},
        {name: 'mock2', price: 0},
        {name: 'mock3', price: 0},
        {name: 'mock4', price: 0},
      ],
    },
    {
      id: 'invoice1',
      description: 'Market shopping',
      status: 'paid',
      note: 'Paid with credit card',
      taxIncludedPrice: '118',
      totalPrice: '100',
      tax: 0.18,
      currency: 'USD',
      date: '2021-04-05T12:28:15.299Z',
      dueDate: '2021-04-05T12:28:15.299Z',
      requiredMaterialList: [
        {name: 'Apple', totalPrice: 11, price: 5, amount: 2.2},
        {name: 'Fries', totalPrice: 19, price: 19, amount: 1},
        {name: 'Fruit Juice', price: 7, amount: 10, totalPrice: 70},
        {name: 'mock1', price: 0},
        {name: 'mock2', price: 0},
        {name: 'mock3', price: 0},
        {name: 'mock4', price: 0},
        {name: 'mock5', price: 0},
      ],
    },
    {
      id: 'invoice2',
      description: 'Outsource backend project',
      status: 'late',
      note: 'This invoice will be paid in cash before the due date',
      taxIncludedPrice: '3750',
      totalPrice: '3000',
      tax: 0.25,
      currency: 'USD',
      date: '2021-04-01T12:28:15.299Z',
      dueDate: '2021-04-05T12:28:15.299Z',
      requiredMaterialList: [
        {
          name: 'Outsource Backend',
          hoursOfWork: 50,
          totalPrice: 2500,
        },
        {
          name: 'Outsource Devops',
          hoursOfWork: 5,
          totalPrice: 500,
        },
      ],
    },
  ],
}

const itemsGenerator = (items, offset = 0) =>
  items.map((i, index) => ({...i, id: 'invoice' + (index + offset)}))

const itemsLength = mockData.items.length
const populatedData = {
  ...mockData,
  items: [
    ...itemsGenerator(mockData.items),
    ...itemsGenerator(mockData.items, itemsLength),
    ...itemsGenerator(mockData.items, itemsLength * 2),
  ],
}

export class Services {
  static read = async ({params}) => {
    // return await request.get(`/`, params)
    // await sleep(1500)
    const filteredItems = populatedData.items.filter(i =>
      Object.entries(params).every(([key, val]) => !val || i[key] === val)
    )
    // console.log(filteredItems)
    return {...populatedData, items: filteredItems}
  }

  static detail = async ({id}) => {
    // return await request.get(`/${id}`, params)
    await sleep(500)
    return {
      meta: populatedData.meta,
      item: populatedData.items.find(i => String(i.id) === String(id)),
    }
  }
}
