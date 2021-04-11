import React from 'react'
import moment from 'moment'

export const Row = ({data, readDetail}) => {
  const {
    id,
    description,
    taxIncludedPrice,
    status,
    note,
    currencySign,
    date,
    requiredMaterialList,
  } = data

  const handleClick = () => readDetail(id)
  return (
    <div className="invoice-row" onClick={handleClick}>
      <div className="title">
        <div className="text">
          <span className="description">{description}</span>
          <span className="note">{note}</span>
        </div>
        <div className={'status ' + status}>{status}</div>
      </div>
      <hr className="hr" />
      <div className="details">
        <div className="list">
          <ul>
            {requiredMaterialList.map(i => (
              <li key={id + i.name}>{i.name}</li>
            ))}
          </ul>
        </div>
        <div className="info">
          <div>{moment(date).format('ll')}</div>
          <div>
            {currencySign}
            {taxIncludedPrice}
          </div>
        </div>
      </div>
    </div>
  )
}
