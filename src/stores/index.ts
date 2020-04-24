import CommonStore from './CommonStore';
import UserStore from './UserStore';

const stores = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
}

export default stores
