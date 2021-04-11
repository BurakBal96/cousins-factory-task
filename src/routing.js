import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {LayoutDefault} from 'layouts'

import {Landing, NoMatch} from 'pages'

const GuestRoute = ({
  component: Component,
  layout: Layout = LayoutDefault,
  ...rest
}) => (
  <Route
    {...rest}
    element={
      <Layout>
        <Component />
      </Layout>
    }
  />
)

export const Routing = props => {
  return (
    <BrowserRouter>
      <Routes>
        <GuestRoute component={Landing} path="/" />

        <GuestRoute path="*" component={NoMatch} />
      </Routes>
    </BrowserRouter>
  )
}
