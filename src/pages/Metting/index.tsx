import React, { Component } from "react"
import AgoraRTC from 'agora-rtc-sdk'
import { inject, observer } from 'mobx-react'
import "./index.styl"

let client: any

const appID = "373a17e296b4442282dcf8532df32ad3"
const token = "006373a17e296b4442282dcf8532df32ad3IACA67qaGzUYPFyk+Fiq6g4dM+U4BLwSwVPGZb0dHBp+gg6C3mwAAAAAEACVhpaLplSdXgEAAQCmVJ1e"
const channel = "bjw-channel"

const recordingStatusMap: Index = {
  0: {
    title: '打开录音',
    icon: 'recording',
  },
  1: {
    title: '正在录音',
    icon: 'recording-run'
  },
  2: {
    title: '点击继续',
    icon: 'recording-pause'
  }
}

interface Index {
  [index: string]: any
}

interface IMedia {
  audio: boolean
  video: boolean
  screen: boolean
}

interface State {
  recordingStatus: number
  isShowSubtitle: boolean
  joined: boolean
}

@inject("userStore")
@observer
class Metting extends Component<any> {

  state: State = {
    recordingStatus: 0,
    isShowSubtitle: false,
    joined: false,
  }

  componentDidMount = () => {
    client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "h264",
    })
    const { userStore: { userList } } = this.props
    if (userList && userList.length) {
      const item = userList.find((item: any) => item.type === 0)
      this.join(item.uid)
      this.subscribe(item.uid)
    }
  }

  async join(uid: number) {
    try {
      const { joined } = this.state
      if (!joined) {
        await this.initPromise()
        await this.joinPromise(token, channel, uid)
        this.publish(uid, {
          audio: true,
          video: false,
          screen: false,
        })
        this.setState({ joined: true })
      }
    } catch (error) {
      console.error('join function ...', error)
    }
  }

  handleStart = () => {
    // TODO 提交会议主题

  }

  handleSubtitle = () => {
    const { isShowSubtitle } = this.state
    this.setState({ isShowSubtitle: !isShowSubtitle })
  }

  handleHangUp = () => {

  }

  initPromise() {
    return new Promise((resolve: any, reject: any) => {
      client.init(appID, () => {
        console.log('init success...')
        resolve()
      }, (err: any) => {
        reject(err)
      })
    })
  }

  joinPromise(token: string, channel: string, uid: number) {
    return new Promise((resolve: any, reject: any) => {
      client.join(token, channel, uid, () => {
        console.log(`join channel: ${channel} success, uid: ${uid}`)
        resolve()
      }, (err: any) => {
        reject(err)
      })
    })
  }

  async publish(uid: number, media: IMedia, id = 'local_stream') {
    try {
      const localStream = await this.streamInitPromise(uid, media, id)
      client.publish(localStream, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      console.log('publish error...', error)
    }
  }

  streamInitPromise(uid: number, media: IMedia, id = 'local_stream') {
    return new Promise((resolve: any, reject: any) => {
      const localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: media.audio,
        video: media.video,
        screen: media.screen,
      })
      localStream.init(() => {
        localStream.play(id)
        resolve(localStream)
      }, (err) => {
        console.log(err)
        reject(err)
      })
    })
  }

  subscribe = (uid: number) => {
    // 当有远端流加入的时候订阅该流
    client.on("stream-added", (evt: any) => {
      const remoteStream = evt.stream
      const id = remoteStream.getId()

      if (id !== uid) {
        client.subscribe(remoteStream, undefined, (err: any) => {
          console.log(err)
        })
      }
      console.log(`stream-added remote-uid: ${id}`)
    })

    // 订阅成功后播放远端流
    client.on("stream-subscribed", (evt: any) => {
      const remoteStream = evt.stream
      const id = remoteStream.getId()
      const { userStore: { userList } } = this.props
      userList.push({
        name: 'f43f3',
        uid: id,
        avatar: '',
        stream: remoteStream,
      });
      remoteStream.play("remote_video_" + id)
      console.log('stream-subscribed remote-uid: ', id)
    })

    // 远端流被移除
    client.on("stream-removed", (evt: any) => {
      var remoteStream = evt.stream
      var id = remoteStream.getId()
      // Stop playing the remote stream.
      remoteStream.stop("remote_video_" + id)
      // Remove the view of the remote stream.
      // removeView(id) 
      console.log('stream-removed remote-uid: ', id)
    })
  }

  render() {
    const { userStore: { userList } } = this.props
    const { recordingStatus, isShowSubtitle } = this.state

    return (
      <div className='metting'>
        <div className='user-container'>
          <div className='user-inner'>

            {
              // 用户头像
              userList.length > 0 &&
              userList.map((item: any) =>
                <div key={item.name} className='user'>
                  <div className='avatar'><img alt='avatar' className='img' src={item.avatar} /></div>
                  <div className='name'>{item.name}</div>
                </div>
              )
            }

            <div className='user'>
              <div className='avatar'><div className='invivate'></div></div>
              <div className='name'><div className='title'>邀请</div></div>
            </div>
          </div>
        </div>

        {/* {
          // 拉流或推流组件
          media.length > 0 &&
          media.map(item =>
            item.type === 0 ? // 推流
              <LivePusher
                mode='RTC'
                key={item.url}
                url={item.url}
                enable-camere={false}
              // bindstatechange={this.handleRecorderStateChange}
              /> :
              item.type === 1 ? // 拉流
                <LivePlayer
                  key={item.url}
                  url={item.url}
                /> : null
          )
        } */}

        <div className='footer'>
          <div className='operator-container'>
            <div onClick={this.handleSubtitle} className='operator-item'>
              <div className={`icon ${isShowSubtitle ? 'translate' : 'translate-no'}`}></div>
              <div className={`title ${isShowSubtitle ? 'active' : ''}`}>{isShowSubtitle ? '关闭' : '开启'}字幕</div>
            </div>
            <div className='operator-item'>
              <div className='icon share'></div>
              <div className='title'>共享屏幕</div>
            </div>
            <div className='operator-item'>
              <div className={`icon ${recordingStatusMap[recordingStatus].icon}`}></div>
              <div className={`title ${recordingStatus > 0 ? 'active' : ''}`}>{recordingStatusMap[recordingStatus].title}</div>
            </div>
          </div>

          {/* <div className='bottom-container'>
            <div className='microphone'></div>
            <div className='camera'></div>
            <div onClick={this.handleHangUp} className='hangup'></div>
          </div> */}
          <div id='local_stream'></div>
        </div>
      </div>
    )
  }
}

export default Metting 
