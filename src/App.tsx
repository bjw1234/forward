import React from 'react';
import './App.styl';
import {
  Switch,
  Route,
  // Link,
} from 'react-router-dom';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Metting from './pages/Metting';
import AddIn from './pages/AddIn';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/addin" component={AddIn} />
        <Route path="/join" component={Join} />
        <Route path="/metting" component={Metting} />
      </Switch>
    </div>
  );
}

export default App;
