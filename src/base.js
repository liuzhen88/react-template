import React from "react";
import axios from "axios";
import { message, notification, Modal } from "antd";
import { createHashHistory } from 'history';

const history = createHashHistory();

axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
  return config;
})

axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  if (error.response.status === 401) {
    history.replace('/login');
  }

  if (error.response.status === 403) {
    notification.warning({message: '系统消息', description: '你没有权限访问接口获取数据，请联系管理员!', duration: 3})
  }

  if (error.response.status>= 500) {
    notification.error({message: '系统消息', description: `接口访问返回状态${error.response.status}，请联系管理员!`, duration: 3})
  }

  return Promise.reject(error)
})

class Base extends React.Component {

  /**
   * GET
   * @param {String}      url     请求地址
   * @param {Object}      params  请求参数
   * @param {Function}    cb      回调函数
   */
  Get(url, params, cb){
    this.Ajax(url, "get", params, data => cb && cb(data));
  }
  /**
   * POST
   * @param {String}      url     请求地址
   * @param {Object}      params  请求参数
   * @param {Function}    cb      回调函数
   */
  Post(url, params, cb, err) {
    this.Ajax(url, "post", params, data => cb && cb(data), cbError => err && err());
  }
  /**
   * PUT
   * @param {String}      url     请求地址
   * @param {Object}      params  请求参数
   * @param {Function}    cb      回调函数
   */
  Put(url, params, cb) {
    this.Ajax(url, "put", params, data => cb && cb(data));
  }
  /**
   * DELETE
   * @param {String}      url     请求地址
   * @param {Object}      params  请求参数
   * @param {Function}    cb      回调函数
   */
  Delete(url, params, cb) {
    this.Ajax(url, "delete", params, data => cb && cb(data));
  }
  Ajax(url, method, params, cb, cbError) {
    let obj = {url:url, method:method }
    if(method === 'get'){
      obj.params = params
    }else{
      obj.data = params
    }
    axios(obj).then(data => {
      if(data.data.isSuccess === true) {
        cb(data.data);
      }else{
        this.Toast(data.data.message);
        cbError && cbError();
      }
    }).catch(err => {
     //cb(err, null)
    });
  }

  Toast(msg, type) {
    if(type === 'success') {
      message.success(msg);
    }else{
      message.warning(msg);
    }
  }

  /**
   * 跳转首页
   */
  LocationPage(path) {
    history.replace(path);
  }

  PushPage(path) {
    history.push(path);
  }

  IsFloat(obj) {  
    let reg = /^\d+(\.\d+)?$/;
    return reg.test(obj);
  }
  
  /**
   * 正整数
   */
  isInteger(val) {
    return /^[0-9]+$/.test(val);
  }

  Request(paras) { 
    let url = window.location.href; 
    url = decodeURI(url);
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
    var paraObj = {}; 
    let j = 0;
    for (var i=0; j = paraString[i]; i++){ 
      paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    } 
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined"){ 
      return ""; 
    }else{ 
      return returnValue; 
    } 
  }

  /**
   * modal confirm
   */
  ModalConfirm(content, onOk) {
    Modal.confirm({
      title: '温馨提示：',
      content: content,
      cancelText: '取消',
      onCancel: () => {
        
      },
      okText: '确定',
      onOk: () => {
        onOk && onOk();
      }
    })
  }
}

export default Base;