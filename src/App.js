import React from 'react';
import './App.css';
import  music from './assets/img/BtnMusicHome.jpg';
import  rap from './assets/img/BtnRAPFRANCAISover.jpg';
import  skate from './assets/img/BtnSkateHome.jpg';
import  random from './assets/img/gKKKK.gif';

// class Toggle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {isToggleOn: true};

//     // This binding is necessary to make `this` work in the callback
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     this.setState(state => ({
//       isToggleOn: !state.isToggleOn
//     }));
//   }

//   render() {
//     return (
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

function RandomLink() {
  let ids=["9eJsDDvpwmE", "nqOTVuG1GPI", "ATypSV5c8hU"];

  function handleClick(e) {
    e.preventDefault();


    let  index = Math.floor(Math.random() * ids.length);
    console.log(index);

    let randomVideo = document.getElementsByClassName("random-video");
    randomVideo[0].src = "https://www.youtube.com/embed/" + ids[index] + "?rel=0&autoplay=1&controls=0&iv_load_policy=3&modestbranding";
    
    document.getElementById("video-container").innerHTML = document.getElementById("video-container").innerHTML;
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
                <div id="video-container">
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