import React from "react";
import Base from "base.js";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import menuList from "Routes/index.js";
import api from "api.js";
import { connect } from "react-redux";
import { userAction, permissionAction } from "Actions";

const { SubMenu } = Menu;

class Container extends Base {

  state = {
    defaultSelectedKeys: this.setDefaultkey(),
    defaultOpenKeys: ['base', "contract", "stock", 'plan', "product"],
    codes: []
  }

  hanldeClick() {

  }

  componentDidMount() {
    this.Get(`${api.user.base}/1`, {}, res => {
      this.props.dispatch(userAction.setUser(res.data));
    })

    this.Get(api.permission.base, {}, res => {
      let codes = res.data.map(item => item.code);
      this.setState({codes: codes});
      this.props.dispatch(permissionAction.setCodes(codes));
    })
  }

  setDefaultkey() {
    let path = this.props.location.pathname;
    let data = menuList.filter(item => item.path === path);
    if(data.length > 0) {
      return data[0].key;
    }else{
      return '';
    }
  }

  setDefaultOpenKey() {
    let path = this.props.location.pathname;
    let data = menuList.filter(item => item.path === path);
    if(data.length > 0) {
      return data[0].type;
    }else{
      return '';
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.LocationPage('/login');
  }

  permissionMenu() {
    if (!this.state) {
      return menuList;
    }
    if(this.props.user.is_admin) {
      return menuList;
    }
    // let data = menuList.filter(v => this.state.codes.indexOf(v.code) >= 0);
    // return data;
    return menuList;
  }

  render() {
    return (
      <div>

        <div className='menu-left'>
          <Menu
            theme="dark"
            style={{width:'100%'}}
            defaultSelectedKeys={[this.state.defaultSelectedKeys]}
            defaultOpenKeys={this.state.defaultOpenKeys}
            mode="inline"
          >
            <SubMenu title='基础设置' key='base'>
              {
                this.permissionMenu().filter(v => v.type === 'base').map((item, index) => <Menu.Item key={item.key} onClick={() => this.hanldeClick(item)}>
                  <Link key={index + '-'} to={item.path}>{item.name}</Link>
                </Menu.Item>
                )
              }
            </SubMenu>

            <SubMenu title='合同管理' key='contract'>
              {
                this.permissionMenu().filter(v => v.type === 'contract').map((item, index) => <Menu.Item key={item.key} onClick={() => this.hanldeClick(item)}>
                  <Link key={index + '-'} to={item.path}>{item.name}</Link>
                </Menu.Item>
                )
              }
            </SubMenu>

            <SubMenu title='计划管理' key='plan'>
              {
                this.permissionMenu().filter(v => v.type === 'plan').map((item, index) => <Menu.Item key={item.key} onClick={() => this.hanldeClick(item)}>
                  <Link key={index + '-'} to={item.path}>{item.name}</Link>
                </Menu.Item>
                )
              }
            </SubMenu>

            <SubMenu title='生产管理' key='product'>
              {
                this.permissionMenu().filter(v => v.type === 'product').map((item, index) => <Menu.Item key={item.key} onClick={() => this.hanldeClick(item)}>
                  <Link key={index + '-'} to={item.path}>{item.name}</Link>
                </Menu.Item>
                )
              }
            </SubMenu>

            <SubMenu title='库存管理' key='stock'>
              {
                this.permissionMenu().filter(v => v.type === 'stock').map((item, index) => <Menu.Item key={item.key} onClick={() => this.hanldeClick(item)}>
                  <Link key={index + '-'} to={item.path}>{item.name}</Link>
                </Menu.Item>
                )
              }
            </SubMenu>

          </Menu>
        </div>

        <div className='menu-right'>
          <div style={{padding: '10px', borderBottom: 'solid #e2e2e2 1px'}}>
            {/* <div className='fl' style={{fontWeight: 'bold'}}>南通江海钢丝绳有限公司</div> */}
            <div className='fr'>
              当前登录用户: {this.props.user.name}
              <span className='action-btn' onClick={() => this.logout()} style={{marginLeft: '15px'}}>退出</span>
            </div>
            <div className='clear'></div>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

Container = connect(mapStateToProps)(Container);

export default Container;