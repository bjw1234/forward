import React, { Component } from "react";
import footer from "../../assets/img/home@2x.png";
import "./index.styl";

class Home extends Component<any> {

  handleLaunch = () => {
    this.props.history.push('/join');
  }

  handleAddIn = () => {
    this.props.history.push('/addin');
  }

  render() {
    return (
      <div className="home">
        <div className="user-info">
          <div className="avatar">
            <img alt="avatar" src="https://avatar-static.segmentfault.com/191/194/1911941393-5ae29232571d9_huge256" />
          </div>
          <div className="name">HI，Hello World!</div>
        </div>
        <div className="banner-wrapper">
          <div onClick={this.handleAddIn} className="banner join-banner">
            <div className="line"></div>
            <div className="text">加入会议</div>
          </div>
          <div onClick={this.handleLaunch} className="banner launch-banner">
            <div className="line"></div>
            <div className="text">发起会议</div>
          </div>
        </div>
        <div>
          <img alt="footer" className="footer-image" src={footer} />
        </div>
      </div>
    );
  }
}

export default Home;
