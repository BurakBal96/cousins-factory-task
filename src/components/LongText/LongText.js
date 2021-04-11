import React, {useState} from 'react'
import {Button} from '../'

export const LongText = ({
  className,
  children = '',
  moreText = 'More',
  limit = 20,
  fs = "",
  ...props
}) => {

  const [all, setAll] = useState(false)

  return !all && children.length > limit ? (
    <pre className={'long-text ' + className}>
      {children.slice(0, limit)}...
      <Button onClick={() => setAll(true)} className={'basic-btn underline ' + fs}>{moreText}</Button>
    </pre>
  ) : <pre className={'long-text ' + className}>
      {children}
    </pre>
}
