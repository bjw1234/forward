import AgoraRTC from 'agora-rtc-sdk';
import * as Conf from '../conf';

export interface IOption {
  uid: string
  token: string
  channel: string
}

export interface IMedia {
  audio: boolean
  video: boolean
  screen: boolean
}

export interface IRTCErr {
  msg: string
  code: number
  error: any
}

export interface IRejectedFn {
  (err: IRTCErr): void
}

export default class RealTimeComm {

  private option: IOption;
  private client: AgoraRTC.Client;
  private joined: boolean;
  private published: boolean;
  private localStream: AgoraRTC.Stream | undefined;
  private remoteStreams: AgoraRTC.Stream[];
  private media: IMedia;

  // current instance
  private static instance: RealTimeComm;

  constructor(option: IOption) {
    this.option = option;
    this.joined = false;
    this.published = false;
    this.remoteStreams = [];
    this.client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "h264",
    });
    this.media = {
      audio: true,
      video: true,
      screen: false,
    };
  }

  public static getInstance(option: IOption) {
    if (!this.instance) {
      this.instance = new RealTimeComm(option);
      return this.instance;
    }
    return this.instance;
  }

  private subscribe = () => {
    // 当有远端流加入的时候订阅该流
    this.client.on("stream-added", (evt: any) => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();

      if (id !== this.option.uid) {
        this.client.subscribe(remoteStream, undefined, (err: any) => {
          this.log(err);
        });
      }
      this.log(`stream-added remote-uid: ${id}`);
    });

    // 订阅成功后播放远端流
    this.client.on("stream-subscribed", (evt: any) => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      // Add a view for the remote stream.
      // addView(id);
      alert(id)
      // Play the remote stream.
      remoteStream.play("remote_video_" + id);
      console.log('stream-subscribed remote-uid: ', id);
    });

    // 远端流被移除
    this.client.on("stream-removed", (evt: any) => {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      // Stop playing the remote stream.
      remoteStream.stop("remote_video_" + id);
      // Remove the view of the remote stream.
      // removeView(id);
      console.log('stream-removed remote-uid: ', id);
    });
  }

  // join channel
  public async join() {
    try {
      if (!this.joined) {
        await this.initPromise();
        await this.joinPromise();
        this.joined = true;
        // publish default stream
        this.publish();
      }
    } catch (error) {
      this.err(error);
    }
  }

  // publish stream
  public async publish(media?: IMedia, id = 'local_stream') {
    try {
      // if (!this.published) {
      await this.streamInitPromise(media, id);
      this.client.publish(this.localStream!, (err) => {
        this.err(err);
      });
      //   this.published = true;
      // }
    } catch (error) {
      this.err(error);
    }
  }

  // leave channel
  public async leave() {
    try {
      await this.leavePromise();
      this.localStream!.stop();
      this.localStream!.close();
      this.joined = false;
      this.published = false;
      while (this.remoteStreams.length > 0) {
        const stream = this.remoteStreams.shift();
        const id = stream!.getId();
        stream!.stop();
        // removeView(id);
      }
    } catch (error) {
      this.err(error);
    }
  }

  private initPromise() {
    return new Promise((resolve: any, reject: IRejectedFn) => {
      this.client.init(Conf.appID, () => {
        this.log('init success');
        resolve();
      }, (err: any) => {
        reject({
          msg: 'client initial error',
          code: 1001,
          error: err,
        });
      });
    });
  }

  private joinPromise() {
    return new Promise((resolve: any, reject: IRejectedFn) => {
      this.client.join(this.option.token, this.option.channel, this.option.uid, () => {
        this.log(`join channel: ${this.option.channel} success, uid: ${this.option.uid}`);
        resolve();
      }, (err) => {
        reject({
          msg: 'client join error',
          code: 1002,
          error: err,
        });
      });
    });
  }

  private streamInitPromise(media?: IMedia, id = 'local_stream') {
    return new Promise((resolve: any, reject: IRejectedFn) => {
      this.media = {
        ...this.media,
        ...media,
      }
      if (this.localStream) this.localStream.stop();
      this.localStream = AgoraRTC.createStream({
        streamID: this.option.uid,
        audio: this.media.audio,
        video: this.media.video,
        screen: this.media.screen,
      });
      this.localStream.init(() => {
        this.localStream!.play(id);
        resolve();
      }, (err) => {
        reject({
          msg: 'stream init error',
          code: 1003,
          error: err,
        });
      });
    });
  }

  private leavePromise() {
    return new Promise((resolve, reject) => {
      this.client.leave(resolve, reject);
    });
  }

  private log(msg: string) {
    console.log(`[FORWARD log] ${msg}`);
  }

  private err(msg: string) {
    if (typeof msg === 'object') {
      console.error(`[FORWARD err] ${JSON.stringify(msg)}`);
      return;
    }
    console.error(`[FORWARD err] ${msg}`);
  }

}

