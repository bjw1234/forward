import React, { Component } from "react";
import { inject } from 'mobx-react'
import "./index.styl";

@inject("userStore")
class Join extends Component<any> {

  handleStart = () => {
    // 存储当前用户
    // TODO 请求网络获得用户信息
    // TODO 获取token，channel
    const uid = Math.floor(Math.random() * 10000)
    const { userStore } = this.props;
    userStore.addUser({
      uid: uid,
      name: uid + '',
      avatar: '',
      stream: null,
      type: 0,
    });
    // TODO 提交会议主题
    this.props.history.replace('/metting');
  }

  handleClose = () => {
    const { history } = this.props
    history.goBack()
  }

  render() {
    return (
      <div className='join'>
        <div onClick={this.handleClose} className='close'></div>
        <div className='title'>
          会议主题
        </div>
        <div className='input-wrapper'>
          <input className='input' type='text' placeholder='请输入会议主题' />
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
