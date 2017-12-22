import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Layout, Menu, Breadcrumb, Popover, Icon, Switch, Input,Button } from 'antd'
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
const content = <Button type="primary">退出</Button>;
export default class PublicComponent extends React.Component{

    state = {
        theme: 'dark',
        current: '1',
    }
    
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div>
                <div
                    style={{ backgroundColor: '#00152A' ,height:'100px'}}
                >
                    <Popover content={content} trigger="hover">
                        <img src="./src/assets/defultHead.jpg" style={{ float: 'right', marginTop: 25, marginRight: 30,  height: '50px' }}/>
                    </Popover>
                    <div style={{ width: 400, height: '100px',marginLeft:240, float: 'left'}}>
                        <Search
                            placeholder="请输入关键字"
                            style={{ width: 300, marginTop: 30,height:'40px',marginRight:10,float:'left'}}
                            onSearch={value => console.log(value)}
                        />
                        <Button type="primary" style={{ float: 'left', marginTop: 30, height: '40px'}}>搜索</Button>
                    </div>
                </div>
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 240,float:'left' }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    
                    <Menu.Item key="12"><Icon type="home" />首页</Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="shop" /><span>商品管理</span></span>}>
                        <Menu.Item key="1">周边产品</Menu.Item>
                        <Menu.Item key="2">宠物信息</Menu.Item>
                        <Menu.Item key="3">库存预警</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>用户管理</span></span>}>
                        <Menu.Item key="11">用户信息</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="setting" /><span>订单管理</span></span>}>
                        <Menu.Item key="5">历史订单</Menu.Item>
                        <Menu.Item key="6">实时订单</Menu.Item>
                        <Menu.Item key="7">用户交易订单</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="user" /><span>员工管理</span></span>}>
                        <Menu.Item key="9">员工信息</Menu.Item>
                        <Menu.Item key="10">设置</Menu.Item>
                    </SubMenu>
                </Menu>
                <Content style={{ margin: '0 16px', float: 'left',width: '78%'}}>
                    
                    <div style={{ padding: 24, background: '#fff', width:'100%' ,marginTop:30,height:500}}>
                       {this.props.children}
                    </div>
                </Content>
            </div>
        );
    }
}

    