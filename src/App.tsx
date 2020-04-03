import React from 'react';
import './App.styl';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div styleName="app">
      <div styleName="header">
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/video">视频会议</Link>
      </div>
      <div styleName="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/video" component={Video} />
        </Switch>
      </div>
      <div styleName="footer">
        页脚
      </div>
    </div>
  );
}

const About = () => <h1>关于</h1>
const Video = () => <h1>视频会议</h1>

export default App;
