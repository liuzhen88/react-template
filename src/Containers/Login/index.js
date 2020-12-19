import React from "react";
import { Input, Button } from "antd";
import axios from "axios";
import Base from "base.js";
import api from "api.js";
import "./index.css";

class Login extends Base {

  state = {
    job_number: '',
    password: ''
  }

  login() {
    axios({
      url: api.token.create,
      method: 'POST',
      data: {
        auth: this.state
      }
    }).then(data => {
      if(data.data.jwt){
        localStorage.setItem('jwt', data.data.jwt);
        this.LocationPage('/');
      }else{
        this.Toast(data.data.message);
      }
      
    }).catch(err => {
      this.Toast('用户名或密码错误');
    })
  }

  render() {
    return (
      <div className='login-container'>
        <div className='login-cont'>
            <div className='login-account-container'>
                <div className='login-account'>
                    <div style={{textAlign: 'center', marginBottom: '20px'}}>
                      <img src='/logo.png' width='200px' alt=''/>
                    </div>
                    <div className='login-manage-title'>标题</div>
                    <div className='login-username'>
                        <Input value={this.state.job_number} className='user-input' placeholder="请输入工号" onChange={
                            e => this.setState({job_number: e.target.value})
                        }/>
                    </div>
                    <div className='login-username'>
                        <Input type='password' value={this.state.password} className='user-input' placeholder="请输入密码" onChange={
                            e => this.setState({password: e.target.value})
                        }/>
                    </div>
                    <div className='login-submit-container'>
                        <Button type='primary' className='login-submit' onClick={() => this.login()}>登录</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Login;