import React from 'react'
import {Header} from 'components'
import './assets/App.scss'

const Content = props => <div id="page">{props.children}</div>

export const LayoutDefault = props => (
  <React.Fragment>
    <Header />
    <Content>{props.children}</Content>
  </React.Fragment>
)
