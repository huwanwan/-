import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import Datagrid from '../components/datagridComponent/datagridComponent';
import Login from '../components/loginComponent/loginComponent';

export default (
    <div>
        <Route path="/" component={Datagrid}></Route>
        <Route path="/Login" component={Login}></Route>
    </div>
)