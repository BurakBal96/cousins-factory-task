import {Button, DatePicker, Input} from 'components'
import {Modal} from 'antd'
import React, {useState} from 'react'

import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  description: yup.string().required('Required!'),
  tax: yup.string().required('Required'),
  date: yup.string().required('Required'),
  dueDate: yup.string().required('Required'),
  requiredMaterialList: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('required'),
        price: yup.string().required('required'),
        amount: yup.string(),
        hoursOfWork: yup.string(),
      })
    )
    .compact()
    .required(),
})

export const Create = ({
  onSubmit = () => null,
  open = false,
  toggleModal = () => null,
}) => {
  const [materialCount, setMaterialCount] = useState(1)

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleToggleModal = () => {
    if (open) {
      reset({})
      setMaterialCount(1)
    }
    toggleModal()
  }
  const handleMaterialCount = () => setMaterialCount(materialCount + 1)
  const handleCreate = async data => {
    await onSubmit(data)

    // this reset has no effect on datepicker-like controlled components
      handleToggleModal()
  }
  return (
    <Modal
      title="Create Invoice"
      visible={open}
      onCancel={handleToggleModal}
      footer={null}>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Input
          label="Description"
          placeholder="Description"
          name="description"
          form={{register, errors}}
        />

        <Input
          containerClassName="mt-10"
          label="Note"
          placeholder="Note"
          name="note"
          form={{register, errors}}
        />

        <Input
          number
          defaultValue="0.18"
          containerClassName="mt-10"
          label="Tax Rate"
          placeholder="Tax Rate (0.18)"
          name="tax"
          form={{register, errors}}
        />

        <div className="horizon around">
          <DatePicker
            containerClassName="mt-10"
            label="Invoice Date"
            name="date"
            form={{register, setValue, errors}}
          />

          <DatePicker
            containerClassName="mt-10"
            label="Invoice Due Date"
            name="dueDate"
            form={{register, setValue, errors}}
          />
        </div>

        <div>
          {Array.from({length: materialCount}).map((_, index) => (
            <MaterialForm
              key={'material-list-' + index}
              index={index}
              form={{register, errors}}
            />
          ))}
        </div>

        <div className="per-100 horizon between mt-20">
          <Button
            type="button"
            className="secondary-btn light"
            onClick={toggleModal}>
            Cancel
          </Button>
          <div>
            <Button
              type="button"
              className="primary-btn light mr-10"
              onClick={handleMaterialCount}>
              New Material
            </Button>
            <Button type="submit" className="primary-btn light">
              Ok
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

const MaterialForm = ({index, form}) => {
  return (
    <div className="material-form">
      <Input
        name={`requiredMaterialList.${index}.name`}
        form={form}
        label="Name"
      />

      <Input
        name={`requiredMaterialList.${index}.price`}
        form={form}
        label="Price"
        number
      />

      <Input
        name={`requiredMaterialList.${index}.amount`}
        form={form}
        label="Amount"
        number
      />

      <Input
        name={`requiredMaterialList.${index}.hoursOfWork`}
        form={form}
        label="Hours of Work"
        number
      />
    </div>
  )
}
