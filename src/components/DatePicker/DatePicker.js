import React from 'react'
import {DatePicker as AntdDatePicker} from 'antd'
import useDeepCompareEffect from 'use-deep-compare-effect'
import moment from 'moment'
import {FormOptions} from 'helpers'

export const DatePicker = ({
  containerClassName = '',
  label,
  name = '',
  form = {},
  onChange = () => null,
  ...props
}) => {
  const {
    register = () => null,
    errors = {},
    setValue = () => null,
    ...restOfForm
  } = form

  const handleChange = date => {
    // date will be null when clear button clicked
    const dateString = date ? moment(date).toISOString() : ''

    setValue(name, dateString, FormOptions)
    onChange(dateString)
  }

  useDeepCompareEffect(() => {
    register(name, {...restOfForm})
  }, [register, name, restOfForm])

  return (
    <div className={'date-picker-container ' + containerClassName}>
      <label className="vertical">
        {label && <span className="label">{label}</span>}
        <AntdDatePicker
          {...props}
          name={name}
          onChange={handleChange}
        />
        {errors[name] && <span className="error">{errors[name].message}</span>}
      </label>
    </div>
  )
}
