import React, { Component } from "react";
import { inject } from 'mobx-react'
import { genAvatarByName } from '../../utils'
import "./index.styl"
import { getToken } from '../../services'
import Toast from '../../components/Toast'

@inject("userStore")
@inject("commonStore")
class Join extends Component<any> {

  state = {
    title: ''
  }

  handleStart = async () => {
    try {
      const { title } = this.state
      if (!title) {
        Toast.info("会议主题不能为空", 1500)
        return
      }
      // 存储当前用户
      // TODO 请求网络获得用户信息
      // TODO 获取token，channel
      const uid = Math.floor(Math.random() * 10000)
      const { userStore, commonStore } = this.props;
      const name = uid + '';
      userStore.addUser({
        uid: uid,
        name,
        avatar: genAvatarByName([90, 90], name),
        stream: null,
        type: 0,
      })
      const tokenRet: any = await getToken(uid)
      if (tokenRet && tokenRet.data) {
        const { data: { Channel, Token } } = tokenRet
        commonStore.setToken(Token)
        commonStore.setChannel(Channel)
        commonStore.setTitle(title)
        this.props.history.replace('/metting')
      }
    } catch (e) {
      console.log(e)
      Toast.info("请求服务器出错", 1500)
    }
  }

  handleClose = () => {
    const { history } = this.props
    history.goBack()
  }

  handleTitleChange = (e: any) => {
    this.setState({ title: e.target.value })
  }

  render() {
    return (
      <div className='join'>
        <div onClick={this.handleClose} className='close'></div>
        <div className='title'>
          会议主题
        </div>
        <div className='input-wrapper'>
          <input onChange={this.handleTitleChange} className='input' type='text' placeholder='请输入会议主题' />
        </div>
        <div className='avatar'>
          <img alt="avatar" src="https://avatar-static.segmentfault.com/191/194/1911941393-5ae29232571d9_huge256" />
        </div>

        <div className='bottom-area'>
          {/* <div className='btns'>
            <div className='btn'>麦克风</div>
            <div className='btn'>摄像头</div>
            <div className='btn'>扬声器</div>
          </div> */}
          <div onClick={this.handleStart} className='start-btn'>开始会议</div>
        </div>

      </div>
    );
  }
}

export default Join;
