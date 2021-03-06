import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'
import './assets/styles/index.css';
import { Provider } from 'react-redux'
import store from './ReduxStore'

// Create Redux Store
//const store = createStore(reducer, /* +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */)
//const testStore = createStore(root)
//console.log(store.getState())

hydrate(<Provider store={store}><App/></Provider>, document.getElementById('root'))