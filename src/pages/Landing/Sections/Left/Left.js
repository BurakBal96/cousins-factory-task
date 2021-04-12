import React, {useState} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'components'
import {Create} from './Create'
import {Filter} from './Filter'
import {useLocation, useNavigate} from 'react-router-dom'
import {qs} from 'helpers'

export const Left = inject('InvoiceStore')(
  observer(() => {
    const navigate = useNavigate()
    const {search} = useLocation()
    const params = qs.parse(search)

    const [createModal, setCreateModal] = useState(false)
    const [filterModal, setFilterModal] = useState(false)

    const toggleCreateModal = () => {
      setCreateModal(!createModal)
    }

    const toggleFilterModal = () => {
      setFilterModal(!filterModal)
    }

    const handleCreate = data => {
      console.log('Created Data', data)
      setCreateModal(false)
    }

    const handleFilter = data => {
      navigate('?' + qs.stringify(data))
      setFilterModal(false)
      // console.log(data)
    }

    return (
      <div className="landing-left">
        <Button className="add-btn light mt-20" onClick={toggleCreateModal}>
          Create
        </Button>
        <Button
          onClick={toggleFilterModal}
          className="secondary-btn light mt-20">
          Filter Options
        </Button>

        <Create
          open={createModal}
          toggleModal={toggleCreateModal}
          onSubmit={handleCreate}
        />
        <Filter
          params={params}
          open={filterModal}
          toggleModal={toggleFilterModal}
          onSubmit={handleFilter}
        />
      </div>
    )
  })
)
