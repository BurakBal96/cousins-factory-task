import React from 'react'
import {inject, observer} from 'mobx-react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {Button} from 'components'
import {Row} from './Row'

export const Landing = inject('InvoiceStore')(
  observer(props => {
    useDeepCompareEffect(() => {
      props.InvoiceStore.read({})
    }, [props.InvoiceStore])
    const {list, meta, state} = props.InvoiceStore
    console.log(list)
    return (
      <div className="landing-page">
        <div className="landing-left">
          <Button className="add-btn light mt-20">Create</Button>
          <Button className="secondary-btn light mt-20">Filter Options</Button>
        </div>

        <div className="landing-center">
          <div className="header">
            {meta.offset} to {meta.offset + meta.count} of
            {' ' + meta.total}
          </div>
          <div className="list">
            {list.map(i => (
              <Row key={i.id} data={i} />
            ))}
          </div>
        </div>

        <div className="landing-right">Right - details</div>
      </div>
    )
  })
)
