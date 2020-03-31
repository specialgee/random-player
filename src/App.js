import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Admin from './components/Admin';
import YouTube from 'react-youtube';
import './App.css';
import  musicImage from './assets/img/button-music.jpg';
import  musicImageActive from './assets/img/button-music-active.jpg';
import  rapImage from './assets/img/button-rap.jpg';
import  rapImageActive from './assets/img/button-rap-active.jpg';
import  skateImage from './assets/img/button-skate.jpg';
import  skateImageActive from './assets/img/button-skate-active.jpg';
import  quarantineImage from './assets/img/quarantine-logo.gif';
import  nextButtonImage from './assets/img/button-next.gif';

let data;
let category;

function setCategory() {
  if ( category === undefined ) {
    let index = Math.floor(Math.random() * Object.keys(data.category).length);

    switch (index) {
      case 0:
        category = "music";
        break;
      case 1:
        category = "rap";
        break;
      case 2:
        category = "skate";
        break;  
      default:
        break;
    }
    
    setActive();
  }
}

function setMenuCategory(e) {
  category = e.target.id.substring(9);

  setActive();
}

function setActive() {
  let categoryImages = document.getElementById("category-container").childNodes;
      
  categoryImages.forEach(element => {
    if (element.classList.contains("category-active")) {
      // remove active status
      element.classList.remove("category-active");
      
      // remove active image
      switch (element.id) {
        case "category-music":
          element.src = musicImage;
          break;
        case "category-rap":
          element.src = rapImage;
          break;
        case "category-skate":
          element.src = skateImage;
          break;
        default:
          break;
      }
    }
  });

  // add active class
  categoryImages.forEach(element => {
    if (element.id.includes("category-" + category)) {
      element.classList.add("category-active");

      switch (element.id) {
        case "category-music":
          element.src = musicImageActive;
          break;
        case "category-rap":
          element.src = rapImageActive;
          break;
        case "category-skate":
          element.src = skateImageActive;
          break;
        default:
          break;
      }  
    }
  });  
}

function handleMouseOver(e) {
  switch (e.target.id) {
    case "category-music":
      e.target.src = musicImageActive;
      break;
    case "category-rap":
      e.target.src = rapImageActive;
      break;
    case "category-skate":
      e.target.src = skateImageActive;
      break;
    default:
      break;
  }
}

function handleMouseOut(e) {
  if (!e.target.classList.contains("category-active")) {
    switch (e.target.id) {
      case "category-music":
        e.target.src = musicImage;
        break;
      case "category-rap":
        e.target.src = rapImage;
        break;
      case "category-skate":
        e.target.src = skateImage;
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
  const videoLength = data.category[categoryName].links.length;

  videoIndex = Math.floor(Math.random() * videoLength);
  
  // shuffle category array
  let randomArray = data.category[categoryName].links;

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

function setViews() {
  let categoryName = category;

  let views = data.category[categoryName].views;
  //console.log(views);

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
          <img src={nextButtonImage} width="164" height="80" alt=""/>
        </button>
      </div>
    );
  }
}

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.showPlayer = false;
    this.youtubePlayerRef = React.createRef();

    this.state = {
      videoId: this.onUpdateVideo(),
      player: null,
    };

    this.onReady = this.onReady.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onRandomVideo = this.onRandomVideo.bind(this);
    this.onUpdateVideo = this.onUpdateVideo.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onShowVideoPlayer = this.onShowVideoPlayer.bind(this);
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
      this.setState({
        videoId: randomData.id
      });
    }).then(() => {
      if (document.getElementById("video-player").classList.contains("hide") && this.showPlayer) {
        document.getElementById("video-container").classList.add("embed-responsive-16by9");
        document.getElementById("logo-container").classList.add("hide");
        document.getElementById("video-player").classList.remove("hide");        
      }

      this.showPlayer = true;

      this.state.player.playVideo();
    }).catch(() => {
      //use `.catch()` to do something after `reject()` has been called
    }).finally(() => {
      //use `.finally()` to do something either way
    });
  }

  onUpdateVideo() {
    new Promise((resolve, reject) => {
      resolve();
    }).then(() => {
      setCategory();
    }).then(() => {
      this.onRandomVideo();
    }).then(() => {
      setViews();
    }).catch(() => {

    }).finally(() => {

    });
  }

  onChangeCategory(e) {
    setMenuCategory(e);

    this.onRandomVideo();    
  }

  onShowVideoPlayer() {
    document.getElementById("video-container").classList.add("embed-responsive-16by9");
    document.getElementById("logo-container").classList.add("hide");
    document.getElementById("video-player").classList.remove("hide");
  }

  render() {
    const opts = {
      width: "60",
      height: "315",
      playerVars: {
        rel: 0,
        autoplay: 0,
        controls: 0,
        iv_load_policy: 3,
        modestbranding: 1
      },
      frameBorder: "0"
    }

    return (
      <div>
        <div id="video-container" className="embed-responsive">
          <div id="logo-container" className="fade-out">
            <img id="quarantine-logo" onClick={this.onUpdateVideo} src={quarantineImage} width="480" height="268" alt=""/>
          </div>
          <div id="video-player" className="hide">
            <YouTube videoId={this.state.videoId} className="random-video" ref={this.youtubePlayerRef} opts={opts} onReady={this.onReady} onEnd={this.onEnd}/>
          </div>
        </div>
        {/* <div id="views-container">
          <p id="views">100</p><p>views</p>
        </div> */}
        <div id="category-container">
          <img id="category-music" className="category-image" onClick={this.onChangeCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={musicImage} width="178" height="33" alt=""/>
          <img id="category-rap" className="category-image" onClick={this.onChangeCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={rapImage} width="178" height="33" alt=""/>
          <img id="category-skate" className="category-image" onClick={this.onChangeCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={skateImage} width="178" height="33" alt=""/>
          <RandomButton onClick={this.onUpdateVideo} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.videoPlayerRef = React.createRef();
  }
  
  render() {
    data = JSON.parse(this.props.appData);
    console.log(data);
    return (
      <Switch>
        <Route exact path="/">
          <div className="App">
            <div className="app-container">
              <div className="row">
                <div className="col-12">
                  <VideoPlayer ref={this.videoPlayerRef} />
                  {/* <button onClick={() => this.videoPlayerRef.current.onUpdateVideo()}>RANDOM</button> */}
                </div>
              </div>
            </div>    
          </div>
        </Route>
        <Route path="/admin" component={Admin} />
      </Switch>
    );
  }
}

export default App;