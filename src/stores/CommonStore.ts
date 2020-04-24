import { observable, action } from 'mobx';

class CommonStore {

  @observable token: string = ''
  @observable channel: string = ''

  @action
  setToken(token: string) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  @action
  setChannel(channel: string) {
    this.channel = channel
  }

  @action
  getChannel() {
    return this.channel
  }
}

export default CommonStore
