import { observable, action } from 'mobx';

class CommonStore {

  @observable token: string = '006373a17e296b4442282dcf8532df32ad3IACAPTc6pBgLU8WqOZYPy8tYnjkiwChxV0F8WmJHWUHM9MdmBIYAAAAAIgAo8PEDFk2kXgQAAQAAAAAAAgAAAAAAAwAAAAAABAAAAAAA' 
  @observable channel: string = '2020_04_24_tvVg'
  @observable title: string = ''

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

  @action
  setTitle(title: string) {
    this.title = title
  }

  @action
  getTitle() {
    return this.title
  }
}

export default CommonStore
