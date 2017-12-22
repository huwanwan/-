import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {ajaxMiddleware} from '../store/ajaxMiddleware'
import reducer from '../reducers/rootReducer.js'

const middleware = applyMiddleware(ajaxMiddleware);
const store = createStore(reducer, middleware);

export default store