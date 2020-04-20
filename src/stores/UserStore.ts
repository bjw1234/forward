import { observable, action } from 'mobx';

class UserStore {

  @observable userList:any = [];

  @action
  addUser(user: any) {
    this.userList.push(user);
  }
}

export interface IUserStore {
  userList: any[]
  addUser: Function
}

export default UserStore;
