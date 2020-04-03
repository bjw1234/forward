import { observable, action } from 'mobx';

class CountStore {

  @observable count: number = 0;

  @action
  countIncrement() {
    this.count++;
  }

  @action
  countDecrement() {
    this.count--;
  }
}

export interface ICountStore {
  count: number
  countIncrement: Function
  countDecrement: Function
}

export default CountStore;
