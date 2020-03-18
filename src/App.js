import React from 'react';
import YouTube from 'react-youtube';
import './App.css';
import  music from './assets/img/BtnMusicHome.jpg';
import  rap from './assets/img/BtnRAPFRANCAISover.jpg';
import  skate from './assets/img/BtnSkateHome.jpg';
import  random from './assets/img/gKKKK.gif';

let ids=["9eJsDDvpwmE", "nqOTVuG1GPI", "ATypSV5c8hU"];
//   constructor(props) {
//     super(props);
//     this.state = {isToggleOn: true};

function setRandomId() {
  let index;
  
  do {
    index = Math.floor(Math.random() * ids.length);
  } while (index === setRandomId.last);

  setRandomId.last = index;
  console.log(index);
//       isToggleOn: !state.isToggleOn
//     }));
//   }

//   render() {
}
//       <button onClick={this.handleClick}>
//         {this.state.isToggleOn ? 'ON' : 'OFF'}
//       </button>
//     );
//   }
// }

// function ActionLink() {
//   function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//   }

//   return (
//     <a href="#" onClick={handleClick}>
//       Click me
//     </a>
//   );
// }
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
    <a className="nav-link" href="./" onClick={handleClick}>
      <img src={random} width="250" height="140" alt=""/>
    </a>
  );
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
              <div className="embed-responsive embed-responsive-16by9">
              <VideoPlayer />
                  <iframe
                    className="random-video"
                    title="yt-video"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/9eJsDDvpwmE?rel=0&autoplay=1&controls=0&iv_load_policy=3&modestbranding"
                    frameBorder="0"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
              <ul className="nav nav-pills nav-fill"></ul>
              <div className="random-button">
                <p>
                  <img src={music} width="178" height="33" alt=""/>
                  <img src={rap} width="178" height="33" alt=""/>
                  <img src={skate} width="178" height="33" alt=""/>
                </p>
	              <p>
                  {/* <a className="nav-link" href="./">
                    <img src={random} width="250" height="140" alt=""/>
                  </a> */}
                  <RandomLink />
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;