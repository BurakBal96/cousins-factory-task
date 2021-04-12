import React from 'react'
import {get} from 'helpers'

export const Input = React.forwardRef(
  (
    {
      className = '',
      containerClassName = '',
      icon = null,
      iconLocation = 'right',
      label = '',
      name = '',
      number = false,

      form = {},

      ...props
    },
    ref
  ) => {
    const {register = () => null, errors = {}, ...restOfForm} = form
    const error = get(errors, name) || {}

    return (
      <div className={'input-container ' + containerClassName}>
        <label>
          {label && <span className="label">{label}</span>}
          <div className={'input-base horizon middle ' + className}>
            {icon && iconLocation === 'left' && (
              <span className="input-icon left">{icon}</span>
            )}
            <input
              className="input per-100"
              {...props}
              ref={ref}
              onKeyDown={
                !number
                  ? undefined
                  : e => {
                        if(!((e.keyCode > 95 && e.keyCode < 106)
                            || (e.keyCode > 47 && e.keyCode < 58)
                            || e.keyCode === 8))
                            e.preventDefault()
                    }
              }
              {...register(name, {...restOfForm})}
            />
            {icon && iconLocation === 'right' && (
              <span className="input-icon right">{icon}</span>
            )}
          </div>
          {error.message && <span className="error">{error.message}</span>}
        </label>
      </div>
    )
  }
)
