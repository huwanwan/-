import React from 'react';
import Datagrid from '../datagridComponent/datagridComponent';
<<<<<<< HEAD
import {hashHistory} from 'react-router';
import '../../sass/titleTips.scss';
=======
import '../../sass/proprietary.scss';
>>>>>>> 723340d67f661b529759775a904b0027336400ee
export default class ProprietaryComponent extends React.Component{
    render(){
        return (
            <div id="proprietary">
                <h2><span>商品管理</span> > 周边产品</h2>
                <Datagrid iCurShow="proprietary" url='proprietary.php' />
            </div>
        )
    }
}