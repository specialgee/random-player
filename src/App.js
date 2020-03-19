import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import './App.css';
import data from './assets/data/data.json'; 
import  music from './assets/img/BtnMusicHome.jpg';
import  rap from './assets/img/BtnRAPFRANCAISover.jpg';
import  skate from './assets/img/BtnSkateHome.jpg';
import  random from './assets/img/gKKKK.gif';

let ids=["9eJsDDvpwmE", "nqOTVuG1GPI", "ATypSV5c8hU"];

console.log("data: ", data);

function setRandomIdNoRepeat() {
  let index;
  
  do {
    index = Math.floor(Math.random() * ids.length);
  } while (index === setRandomIdNoRepeat.last);
  
  setRandomIdNoRepeat.last = index;
  console.log(index);

  return ids[index];
}

function setCategoryIdPromise() {
  let categoryName;
  let categoryIndex;
  const categoryLength = Object.keys(data.category).length;

  new Promise((resolve, reject) => {
    resolve();
  }).then(() => {
    categoryIndex = Math.floor(Math.random() * categoryLength);
    console.log("categoryIndex: ", categoryIndex);
  }).catch(() => {
    
  }).finally(() => {
    
  });
}

class ButtonPortal extends React.Component {
  constructor(props) {
    super(props);
    this.button = document.getElementById("portal-root");
  }
  componentDidMount() {
  
  }
  componentWillUnmount() {
    
  }
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.button
    );
  }
}

class RandomButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    
  }
  render() {
    return (
      <div id="video-button-container">
        <button id="video-button" className="video-button nav-link" onClick={this.props.onClick}>
          <img src={random} width="250" height="140" alt=""/>
        </button>
      </div>
    );
    // return ReactDOM.createPortal(
    //   <button className="video-button nav-link" onClick={this.props.onClick}>
    //     <img src={random} width="250" height="140" alt=""/>
    //   </button>,
    //   document.getElementById("portal-root")
    // );
  }
}

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: "9eJsDDvpwmE",
      player: null,
    };

    this.onReady = this.onReady.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onRandomVideo = this.onRandomVideo.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
  }

  onReady(event) {
    console.log(`YouTube Player object for videoId: "${this.state.videoId}" has been saved to state.`); // eslint-disable-line
    this.setState({
      player: event.target,
    });
  }

  onEnd(event) {
    // this.setState({
    //   player: event.target,
    // });
    this.onRandomVideo();
  }

  onPlayVideo() {
    this.state.player.playVideo();
  }

  onPauseVideo() {
    this.state.player.pauseVideo();
  }

  onRandomVideo() {
    new Promise((resolve, reject) => {
      resolve();
    }).then(() => {
      //use `.then()` to do something after `resolve()` has been called
      this.setState({
        videoId: setRandomId()
      });
    }).then(() => {
      //use `.then()` to do something after `resolve()` has been called
      this.state.player.playVideo();
    }).catch(() => {
      //use `.catch()` to do something after `reject()` has been called
    }).finally(() => {
      //use `.finally()` to do something either way
    });
  }

  render() {
    const opts = {
      width: "60",
      height: "315",
      playerVars: {
        rel: 0,
        autoplay: 0,
        controls: 1,
        iv_load_policy: 3,
        modestbranding: 1
      },
      frameBorder: "0"
    }

    return (
      <div id="video-player">
        <YouTube videoId={this.state.videoId} className="random-video" opts={opts} onReady={this.onReady} onEnd={this.onEnd}/>
        {/* <div id="video-controls">
          <button onClick={this.onPlayVideo}>Play</button>
          <button onClick={this.onPauseVideo}>Pause</button>
        </div> */}
        <ButtonPortal>
          <RandomButton onClick={this.onRandomVideo} />
        </ButtonPortal>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="embed-responsive embed-responsive-16by9">
              <VideoPlayer />
            </div>
            <div>
              <img src={music} width="178" height="33" alt=""/>
              <img src={rap} width="178" height="33" alt=""/>
              <img src={skate} width="178" height="33" alt=""/>
            </div>
	              
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;