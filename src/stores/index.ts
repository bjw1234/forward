import CountStore from './CountStore';
import UserStore from './UserStore';

const stores = {
  countStore: new CountStore(),
  userStore: new UserStore(),
}

export default stores;
