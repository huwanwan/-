import React from "react"
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router,Route,hashHistory} from 'react-router'
import store from './store/configStore.js'
import routes from './routers/rootRouter.js'

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}></Router>
    </Provider>
    , document.getElementById('app'))
