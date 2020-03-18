import React from 'react';
import './App.css';
import  music from './assets/img/BtnMusicHome.jpg';
import  rap from './assets/img/BtnRAPFRANCAISover.jpg';
import  skate from './assets/img/BtnSkateHome.jpg';
import  random from './assets/img/gKKKK.gif';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="yt-video"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/9eJsDDvpwmE?rel=0&autoplay=1&controls=0&iv_load_policy=3&modestbranding"
                  frameBorder="0"
                  allowFullScreen>
                </iframe>
              </div>
              <ul className="nav nav-pills nav-fill"></ul>
              <div className="random-button">
                <p>
                  <img src={music} width="178" height="33" alt=""/>
                  <img src={rap} width="178" height="33" alt=""/>
                  <img src={skate} width="178" height="33" alt=""/>
                </p>
	              <p>
                  <a className="nav-link" href="./">
                    <img src={random} width="250" height="140" alt=""/>
                  </a>
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;