import React from 'react'
import {Button, Radio} from 'components'
import {Modal} from 'antd'
import {useForm} from 'react-hook-form'

export const Filter = ({
  onSubmit = () => null,
  open = false,
  toggleModal = () => null,
  params = {},
}) => {
  const {register, reset, handleSubmit} = useForm({
    defaultValues: {status: '', ...params},
  })

  const handleToggleModal = () => {
    if (open) reset(params)

    toggleModal()
  }

  const handleFilter = async data => {
    await onSubmit(data)

    reset(data)
  }

  return (
    <Modal
      title="Filter Options"
      visible={open}
      onCancel={handleToggleModal}
      footer={null}>
      <form onSubmit={handleSubmit(handleFilter)}>
        <Radio
          label="Invoice Status"
          name="status"
          options={[
            {label: 'All', value: ''},
            {label: 'Paid', value: 'paid'},
            {label: 'Outstanding', value: 'outstanding'},
            {label: 'Late', value: 'late'},
          ]}
          form={{register}}
        />

        <div className="per-100 horizon between mt-20">
          <Button
            type="button"
            className="secondary-btn light"
            onClick={handleToggleModal}>
            Cancel
          </Button>

          <Button type="submit" className="primary-btn light">
            Filter
          </Button>
        </div>
      </form>
    </Modal>
  )
}
