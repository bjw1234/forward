import React from 'react';
import './App.styl';
import {
  Switch,
  Route,
  // Link,
} from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Join from './pages/Join';
import Metting from './pages/Metting';

function App() {
  return (
    <div className="app">
      {/* <div styleName="header">
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/video">视频会议</Link>
      </div> */}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/join" component={Join} />
        <Route path="/metting" component={Metting} />
        <Route path="/video" component={Video} />
      </Switch>

      {/* <div styleName="footer">
        页脚
      </div> */}
    </div>
  );
}

export default App;
