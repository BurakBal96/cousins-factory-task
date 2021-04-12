import React from 'react'
import {inject, observer} from 'mobx-react'
import {Loader} from 'components'
import {Detail} from './Detail'

export const Right = inject('InvoiceStore')(
  observer(props => {
    const {item, detailState} = props.InvoiceStore

    return (
      <div className="landing-right">
        {detailState !== 'done' ? (
          <Loader className="large" />
        ) : (
          <Detail data={item} />
        )}
      </div>
    )
  })
)
