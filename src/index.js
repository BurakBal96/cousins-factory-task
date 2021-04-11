import {Provider} from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import {stores} from 'stores'
import {App} from './App'

const render = Component => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider {...stores}>
        <Component />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render(App)
