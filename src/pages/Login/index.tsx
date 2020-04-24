import React, { Component } from "react";
import footer from "../../assets/img/home@2x.png"
import "./index.styl";
import Toast from '../../components/Toast/index'
import { login, register } from '../../services/index'

class Login extends Component<any> {
  state = {
    phone: '',
    password: '',
  }

  handleLogin = async () => {
    try {
      const { phone, password } = this.state
      if (!phone.trim() || !password.trim()) {
        Toast.info('用户名或密码不能为空', 1500)
        return
      }
      if (!/\w{6,12}/.test(password)) {
        Toast.info('请输入6-12位密码', 1500)
        return
      }
      // 请求接口 保存数据  跳转页面
      const res = await login(phone, password)
      if (res && res.data) {
        const { data: { code, data } } = res
        if (code === '500') {
          Toast.info("服务端出错", 1500)
          return;
        }
        if (code === '404') {
          Toast.info("密码错误", 1500)
          return
        }
        if (code === '200') {
          if (data && data.uid) {
            localStorage.setItem('uid', data.uid)
            this.props.history.replace('/')
            return
          }
        }
        if (code === '400') {
          // 注册
          const reg = await register(phone, password)
          if (reg && reg.data && reg.data.code === '200') {
            const res = await login(phone, password)
            const { data: { data } } = res
            if (data && data.uid) {
              localStorage.setItem('uid', data.uid)
              this.props.history.replace('/')
              return
            }
          } else {
            Toast.info("注册错误", 1500)
          }
        }
      }
    } catch (e) {
      Toast.info('登录错误', 1500)
    }
  }

  handlePhoneChange = (e: any) => {
    this.setState({ phone: e.target.value })
  }

  handlePassChange = (e: any) => {
    this.setState({ password: e.target.value })
  }

  render() {
    const { phone, password } = this.props
    return (
      <div className="login">
        <div className="title">登录/注册</div>
        <div className="input-wrapper">
          <input value={phone} onChange={this.handlePhoneChange} placeholder="请输入用户名" />
        </div>
        <div style={{ height: 26 }}></div>
        <div className="input-wrapper">
          <input value={password} onChange={this.handlePassChange} type="password" placeholder="请输入6-12位密码" />
        </div>
        <div className="btn" onClick={this.handleLogin}>登录/注册</div>
        <div>
          <img alt="footer" className="footer-image" src={footer} />
        </div>
      </div>
    );
  }
}

export default Login
