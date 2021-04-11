import React from 'react'

export const Input = ({
  className = '',
  icon = null,
  iconLocation = 'right',
  ...props
}) => {
  return (
    <label className={'input-base horizon middle ' + className}>
      {icon && iconLocation === 'left' && (
        <span className="input-icon left">{icon}</span>
      )}
      <input className="input per-100" {...props} />
      {icon && iconLocation === 'right' && (
        <span className="input-icon right">{icon}</span>
      )}
    </label>
  )
}
