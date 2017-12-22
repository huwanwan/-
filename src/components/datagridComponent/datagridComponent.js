import React from 'React';
import { connect } from 'react-redux';
import { Spin, Modal , Alert,Button} from 'antd';

import * as datagridAction from '../../actions/datagridAction';
import '../../sass/datagrid.scss';
class Datagrid extends React.Component {
    componentWillMount(){
        this.setState({
            newList:{},
            visible:false,
            status:'1',
            page:1,
            err:1
        })
    }
    componentDidMount(){
        this.props.getData({ status: 'page', page:1 });
    }
    getKeys(data){
        var newObj = (data ? Object.keys(data) : []);
        let has = newObj.indexOf("id");
        if (has > 0){
            newObj.splice(has,1);
        }
        return newObj;
    }
    changePage(event){
        this.setState({ iCur: event.target.innerHTML, page: event.target.innerHTML});
        let params = {
            status:'page',
            page:event.target.innerHTML
        };
        this.props.getData(params);
    }
    createPage(){
        if(!this.props.total){
            return;
        }
        let page = [];
        for (let i = 1; i < Math.ceil(Number(this.props.total)/8)+1; i++) {
            page.push(<li key={i} className={i == this.state.page ? 'active' : ""} onClick={this.changePage.bind(this)}>{i}</li>);
        }
        return page;
    }
    moreCont(event){
        let id = event.target.id;
        this.setState({ goodsId: id });
        this.props.getData({
            status:'get',
            goodsId:id,
            page: this.props.iCur
        })
        this.showModal();

    }
    showModal(){
        this.setState({
            visible: true,
            status: '1'
        });
    }
    handleOk(){
        this.setState({
            visible: false,
            status: '1'
        });
    }
    handleCancel(){
        this.setState({
            visible: false,
            status:'1'
        });
    }
    render(){
        return (
            <div className="datagrid">
                <div className={this.props.shade}></div>
                <Spin className={this.props.loading} />
                <table>
                    <thead>
                        <tr>
                            {
                                this.getKeys(this.props.dataList[0]).map((key,index)=>{
                                    return <th key={index}>{key}</th>
                                })
                            }
                            <th><Button type="danger" onClick={this.addData.bind(this)}>添加</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.dataList.map((item,index)=>{
                                return (
                                    <tr key={item.goodsId} onClick={this.checkThis}>
                                        {
                                            this.getKeys(item).map((goods,idx)=>{
                                                    return <td key={'td' + idx}>
                                                        {item[goods]}
                                                    </td>
                                            })
                                        }
                                        <td>
                                            <Button type="primary" id={item.goodsId} onClick={this.moreCont.bind(this)}>查看</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <ul>
                    {this.createPage()}
                </ul>
                <Modal
                    title="商品详情"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText="确认"
                    cancelText="取消"
                >
                
                <Alert message={this.state.alert} className={this.state.err == 1 ? 'hide' : ""} type="error" />
                {
                    this.getKeys(this.props.moreData[0]).map((goods, idx) => {
                        if (goods != "goodsImg") {
                            if (this.state.status == "1"){
                                return <p key={"p" + idx}><label key={"label" + idx}>{goods}</label><span>{this.props.moreData[0][goods]}</span></p>;
                            } else if (this.state.status == "2"){
                                return <p key={"p" + idx}><label key={"label" + idx}>{goods}</label><input type="text" id={goods} key={"text"+idx} disabled={goods == "goodsId" ? 'true' : ""} value={this.state.moreList[0][goods]} onChange={this.changeVal.bind(this)} /></p>;
                            }
                        }
                        if (goods == "goodsImg") {
                            let arr = this.props.moreData[0][goods].split(",");
                            return <div className="imgBox" key={"p" + idx}><label key={"label" + idx}>{goods}</label><img src={arr[0]} /></div>;
                        }

                    })
                } 
                {
                    this.getKeys(this.state.moreData).map((goods, idx) => {
                        if(this.state.status != "3"){
                            return;
                        }else{
                            if (goods !== "goodsImg") {
                                return <p key={"p" + idx}><label key={"label" + idx}>{goods}</label><input type="text" id={goods} key={"text" + idx} onBlur={this.loseFocus.bind(this)} placeholder={goods} /></p>;
                            } else if (goods == "goodsImg") {
                                return <form name="form1" id="form1" key="form1"><label> {goods} </label><input id="file" type="file" name="pic" /></form>
                            }
                        }
                    })
                }
                    <div className="otherAction">
                        <Button type="primary"  className={this.state.status=="3" ? 'hide' : ""} onClick={this.changeCont.bind(this)}>编辑</Button>
                        <Button type="primary" onClick={this.saveDel.bind(this)}>{this.state.status == "2" || this.state.status == "3" ? "保存" : "删除"}</Button>
                    </div>
                </Modal>
            </div>
        )
    }
    addData(){
        let newData = JSON.parse(JSON.stringify(this.props.dataList[0]));
        newData.goodsImg = "";
        this.setState({
            visible: true,
            status: '3',
            err:1,
            moreData: newData
        })
      
    }
    loseFocus(event){                   
        let newData = JSON.parse(JSON.stringify(this.state.newList));
        if (event.target.id !== "keepDate" && event.target.id !== "addTime" && event.target.value == ""){
           this.setState({
               alert:"输入不可为空!",
               err:2
           })
           event.target.focus();
        }else{
           this.setState({
               err:1
           }) 
            newData[event.target.id] = event.target.value;
            this.setState({
                newList: newData
            })
        }
    }
    changeCont(){
        this.setState({
            'status':'2',
            moreList: this.props.moreData
        })
    }
    changeVal(event){
        let newArr = JSON.parse(JSON.stringify(this.state.moreList));
        newArr[0][event.target.id] = event.target.value;
        for (var attr in newArr[0]) {
            if (newArr[0][attr] == this.props.moreData[0][attr]) {
                delete newArr[0][attr];
            }
        }
        newArr[0].goodsId = this.state.goodsId;
        newArr[0].update = "true";
        if(!newArr[0].name){
            newArr[0].name = this.props.moreData[0].name;
        }
        this.setState({
            moreList:newArr
        })
    }
    saveDel(event){
        if (this.state.status == "2"){
            this.state.moreList[0].status = 'upd';
            if (!this.state.moreList[0].update){
                this.handleCancel();
                return;
            }
            this.props.getData(this.state.moreList[0]);
        } else if (this.state.status == "1"){
            this.props.getData({
                status:'del',
                goodsId: this.state.goodsId
            });
        }else if(this.state.status == "3"){
            let addData = JSON.parse(JSON.stringify(this.state.newList));
            for(var attr in this.props.dataList[0]){
                if(attr != 'keepDate' && !addData[attr]){
                    console.log(11)
                    this.setState({
                       alert:"输入不可为空!",
                       err:2
                    })
                    return;
                }
            }
            addData.status = "add";
            this.props.getData(addData);   
        }
        this.handleCancel();
    }
    componentDidUpdate(){
        console.log(1,this.props.moreData)
        if(this.props.moreData == "ok"){
           let params = {
               status: 'page',
               page: this.state.page
           };
           this.props.getData(params);
       }
    }
}
const mapToState = function(state){
    return {
        shade: state.Datagrid.shade ? state.Datagrid.shade : 'shade hide',
        loading: state.Datagrid.loading ? state.Datagrid.loading : 'loading hide',
        dataList: state.Datagrid.dataList ? state.Datagrid.dataList : [],
        total: state.Datagrid.total,
        iCur: state.Datagrid.iCurPage,
        moreData: state.Datagrid.moreData ? state.Datagrid.moreData : ""
    }
}
export default connect(mapToState, datagridAction)(Datagrid);