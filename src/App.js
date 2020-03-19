import React from 'react';
import YouTube from 'react-youtube';
import './App.css';
import  music from './assets/img/button-music.jpg';
import  musicActive from './assets/img/button-music-active.jpg';
import  rap from './assets/img/button-rap.jpg';
import  rapActive from './assets/img/button-rap-active.jpg';
import  skate from './assets/img/button-skate.jpg';
import  skateActive from './assets/img/button-skate-active.jpg';
import  random from './assets/img/quarantine.gif';

let data;
let category = "rap";

function setCategory(e) {
  category = e.target.id.substring(9);
  console.log(category);

  setActive(e);
}

function setActive(e) {
  let categoryImages = document.getElementById("category-container").childNodes;
      
  categoryImages.forEach(element => {
    if (element.classList.contains("category-active")) {
      // remove active status
      element.classList.remove("category-active");
      
      // remove active image
      switch (element.id) {
        case "category-music":
          element.src = music;
          break;
        case "category-rap":
          element.src = rap;
          break;
        case "category-skate":
          element.src = skate;
          break;
        default:
          break;
      }
    }
  });

  // add active class
  e.target.classList.add("category-active");

  switch (e.target.id) {
    case "category-music":
      e.target.src = musicActive;
      break;
    case "category-rap":
      e.target.src = rapActive;
      break;
    case "category-skate":
      e.target.src = skateActive;
      break;
    default:
      break;
  }
}

function handleMouseOver(e) {
  switch (e.target.id) {
    case "category-music":
      e.target.src = musicActive;
      break;
    case "category-rap":
      e.target.src = rapActive;
      break;
    case "category-skate":
      e.target.src = skateActive;
      break;
    default:
      break;
  }
}

function handleMouseOut(e) {
  if (!e.target.classList.contains("category-active")) {
    switch (e.target.id) {
      case "category-music":
        e.target.src = music;
        break;
      case "category-rap":
        e.target.src = rap;
        break;
      case "category-skate":
        e.target.src = skate;
        break;
      default:
        break;
    }  
  }
}

function setRandomId() {
  // set category name
  let categoryName;
  categoryName = category;

  // set video index
  let videoIndex;
  const videoLength = data.category[categoryName].length;

  videoIndex = Math.floor(Math.random() * videoLength);
  
  // shuffle category array
  let randomArray = data.category[categoryName];

  shuffleId(randomArray)
  
  // set video title
  let videoTitle;
  let videoId;

  videoTitle = randomArray[videoIndex].title;
  //console.log("videoTitle: ", videoTitle);

  // set video id
  videoId = randomArray[videoIndex].id;
  //console.log("videoId: ", videoId);

  let videoData = {
    category: categoryName,
    title: videoTitle,
    id: videoId
  };
  console.log(videoData);

  return videoData;
}

function shuffleId(array) {
  // set random id using Fisher-Yates shuffle
  // see Mike Bostock article: https://bost.ocks.org/mike/shuffle/
  let i = array.length;
  let j, t;

  while (i) {
    j = Math.floor(Math.random() * i--);
    t = array[i];
    array[i] = array[j];
    array[j] = t; 
  }
  //console.log("shuffle: ", array);
  return array;
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
        <button id="video-button" className="video-button" onClick={this.props.onClick}>
          <img src={random} width="250" height="140" alt=""/>
        </button>
      </div>
    );
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
    this.onRandomVideo();
  }

  onPlayVideo() {
    this.state.player.playVideo();
  }

  onPauseVideo() {
    this.state.player.pauseVideo();
  }

  onRandomVideo() {
    let randomData = setRandomId();

    new Promise((resolve, reject) => {
      resolve();
    }).then(() => {
      //use `.then()` to do something after `resolve()` has been called
    }).then(() => {
      this.setState({
        videoId: randomData.id
      });
    }).then(() => {
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
        autoplay: 1,
        controls: 0,
        iv_load_policy: 3,
        modestbranding: 1
      },
      frameBorder: "0"
    }

    return (
      <div id="video-wrapper">
        <div className="embed-responsive embed-responsive-16by9">
          <div id="video-player">
            <YouTube videoId={this.state.videoId} className="random-video" opts={opts} onReady={this.onReady} onEnd={this.onEnd}/>
          </div>
        </div>
        <div id="category-container">
          <img id="category-music" className="category-image" onClick={setCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={music} width="178" height="33" alt=""/>
          <img id="category-rap" className="category-image category-active" onClick={setCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={rapActive} width="178" height="33" alt=""/>
          <img id="category-skate" className="category-image" onClick={setCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={skate} width="178" height="33" alt=""/>
          <RandomButton onClick={this.onRandomVideo} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    data = JSON.parse(this.props.appData);
    console.log(data);
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <VideoPlayer />;
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;