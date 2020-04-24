import { observable, action } from 'mobx';

class UserStore {

  @observable userList: any = [];

  @action
  addUser(user: any) {
    this.userList.push(user);
  }

  @action
  delUser(id: any) {
    const list = this.userList.filter((user: any) => user.uid !== id)
    this.userList = list;
  }

  @action
  clear() {
    this.userList = []
  }
}

export interface IUserStore {
  userList: any[]
  addUser: Function
}

export default UserStore;
