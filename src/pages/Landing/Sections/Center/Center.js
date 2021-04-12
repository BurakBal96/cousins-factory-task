import React from 'react'
import {inject, observer} from 'mobx-react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {Loader} from 'components'
import {Row} from './Row'

export const Center = inject('InvoiceStore')(
  observer(props => {

    useDeepCompareEffect(() => {
      props.InvoiceStore.read({}).then(res => {
        const id = res.items?.[0]?.id
        if (id) props.InvoiceStore.read({id})
      })
    }, [props.InvoiceStore])
    const {list, meta, state} = props.InvoiceStore

    const readDetail = id => props.InvoiceStore.read({id})

    return (
      <div className="landing-center">
        {state !== 'done' ? (
          <Loader className="large" />
        ) : (
          <>
            <div className="header">
              {`${meta.offset + 1} to ${meta.offset + meta.count + 1} of ${
                meta.total
              }`}
            </div>
            <div className="list">
              {list.map(i => (
                <Row key={i.id} readDetail={readDetail} data={i} />
              ))}
            </div>
          </>
        )}
      </div>
    )
  })
)
