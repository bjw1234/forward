import React, { Component } from 'react';
import * as Conf from '../../conf';
import RealTimeComm from '../../cores/rtc';

let rtc: any;

class Video extends Component {

  componentDidMount = () => {
    rtc = RealTimeComm.getInstance({
      uid: "bjw-uid",
      token: Conf.token,
      channel: Conf.channel,
    });
  }

  handleJoin = () => {
    // // 启动监听
    // this.subscribe();
    rtc.join();
  }

  handleShare = () => {
    rtc.publish({
      audio: false,
      video: false,
      screen: true,
    }, 'local_share');
  }

  handleLeave = () => {
    rtc.leave();
  }


  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <button onClick={this.handleJoin}>加入会议</button>
          <button onClick={this.handleLeave}>离开会议</button>
          <button onClick={this.handleShare}>共享桌面</button>
        </div>
        <div style={{ display: "flex" }}>
          <div id="local_stream" style={{ width: 400, height: 300, margin: '0 auto', background: 'black' }}></div>
          <div id="local_share" style={{ width: 400, height: 300, margin: '0 auto', background: 'black' }}></div>
        </div>
      </div >
    );
  }
}

export default Video;