import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import Login from '../components/loginComponent/loginComponent';
import PublicComponent from '../components/publicComponent/publicComponent';
import Proprietary from '../components/proprietaryComponent/proprietaryComponent';
<<<<<<< HEAD
import UserManage from '../components/userManageComponent/userManageComponent';
import selfOrder from '../components/selfOrderComponent/selfOrder';
import UserSeller from '../components/userSellerComponent/userSeller';
import ChatComponent from '../components/chatComponent/chatComponent';
=======
import PetComponent from '../components/pet/PetComponent';
import WarningComponent from '../components/warning/warningComponent';
import SettingComponent from '../components/settingComponent/settingComponnent';
import StaffComponent from '../components/staffComponent/staffComponent';
>>>>>>> 723340d67f661b529759775a904b0027336400ee
export default (
    <div>
        <Route path="/" component={Login}></Route>
        <Route path="/index" component={PublicComponent}>
            <IndexRoute component={Proprietary} />
<<<<<<< HEAD
            <Route path="chat" component={ChatComponent}></Route>
            <Route path="proprietary" component={Proprietary}></Route>
            <Route path="userManage" component={UserManage}></Route>
            <Route path="selfOrder" component={selfOrder}></Route>
            <Route path="userSeller" component={UserSeller}></Route>
=======
            <Route path="proprietary" component={Proprietary}></Route>
            <Route path="pet" component={PetComponent}></Route>
            <Route path="warning" component={WarningComponent}></Route>
            <Route path="staff" component={StaffComponent}></Route>
            <Route path="setting" component={SettingComponent}></Route>
>>>>>>> 723340d67f661b529759775a904b0027336400ee
        </Route>
    </div>
)