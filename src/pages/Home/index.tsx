import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ICountStore } from '../../stores/CountStore';

interface IChild {
  countStore: ICountStore
}

@inject('countStore')
@observer
class Home extends Component<IChild> {

  render() {
    const { countStore } = this.props;
    return (
      <div>
        <div>{countStore.count}</div>
        <button onClick={() => countStore.countIncrement()}>增加</button>
        <button onClick={() => countStore.countDecrement()}>减少</button>
      </div>
    );
  }
}

export default Home;
