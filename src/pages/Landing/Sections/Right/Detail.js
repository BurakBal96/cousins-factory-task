import React from 'react'
import moment from 'moment'
import {Button} from 'components'

export const Detail = ({data}) => {
  const {
    id,
    description,
    taxIncludedPrice,
    totalPrice,
    tax,
    status,
    note,
    // currency,
    currencySign,
    date,
    dueDate,
    requiredMaterialList,
  } = data

  const mailto = 'mailto:?body=' + encodeURIComponent(JSON.stringify(data))

  return (
    <>
      <div className="header">
        <span>Details of {description}</span>
        <span>
          Status: <span className="uppercase">{status}</span>
        </span>
      </div>
      <div className="container">
        <div>ID</div>
        <div>: {id}</div>

        <div>Note</div>
        <div>: {note}</div>

        <div>Total Price (w/o tax)</div>
        <div>
          : {currencySign}
          {totalPrice}
        </div>

        <div>Tax Rate</div>
        <div>: {tax}%</div>

        <div>Total Price</div>
        <div>
          : {currencySign}
          {taxIncludedPrice}
        </div>

        <div>Transaction Date</div>
        <div>: {moment(date).format('lll')}</div>

        <div>Due Date</div>
        <div>: {moment(dueDate).format('lll')}</div>

        <div>Material List</div>
        <div>
          <ul className="ul">
            {requiredMaterialList.map(i => (
              <li key={id + i.name}>
                {i.name}
                <ul>
                  {i.price ? <li>Price: {i.price}</li> : ''}
                  {i.amount ? <li>Amount: {i.amount}</li> : ''}
                  {i.hoursOfWork ? <li>Hours of work: {i.hoursOfWork}</li> : ''}
                  {i.totalPrice ? <li>Total Price: {i.totalPrice}</li> : ''}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="actions">
        <Button className="primary-btn light">Edit</Button>
        <a className="btn basic-btn mt-10" href={mailto}>
          Send Invoice via Mail
        </a>
      </div>
    </>
  )
}
