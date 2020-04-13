import React from 'react';
import YouTube from 'react-youtube';
import RandomButton from './RandomButton';
import  musicImage from '../assets/img/button-music.jpg';
import  musicImageActive from '../assets/img/button-music-active.jpg';
import  rapImage from '../assets/img/button-rap.jpg';
import  rapImageActive from '../assets/img/button-rap-active.jpg';
import  skateImage from '../assets/img/button-skate.jpg';
import  skateImageActive from '../assets/img/button-skate-active.jpg';
import  quarantineImage from '../assets/img/quarantine-logo.gif';

let category;

function setCategory(data) {
    if (category === undefined) {
        let index = Math.floor(Math.random() * Object.keys(data).length);

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

function setActive() {
    let categoryImages = document.querySelectorAll('#category-container img');

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

function setRandomId(data) {
    // set data category
    let dataCategory;

    switch (category) {
        case "music":
            dataCategory = data.music;
            break;
        case "rap":
            dataCategory = data.rap;
            break;
        case "skate":
            dataCategory = data.skate;
            break;
        default:
            break;
    }

    // set video index
    let videoIndex;
    const videoLength = dataCategory.length;

    videoIndex = Math.floor(Math.random() * videoLength);

    // shuffle category array
    let randomArray = dataCategory;

    shuffleId(randomArray)

    // set video title
    let videoTitle;
    let videoId;

    videoTitle = randomArray[videoIndex].title;
    //console.log("videoTitle: ", videoTitle);

    // set video id
    videoId = randomArray[videoIndex].url;
    //console.log("videoId: ", videoId);

    let videoData = {
        category: category,
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

// function setViews() {
//   let categoryName = category;

//   let views = data.category[categoryName].views;
//   //console.log(views);
// }

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.showPlayer = false;
        this.youtubePlayerRef = React.createRef();

        this.state = {
            videoId: "",
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
        let randomData = setRandomId(this.props.data);

        new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            //use `.then()` to do something after `resolve()` has been called
            this.setState({
                videoId: randomData.id
            });
        }).then(() => {
            if (!this.showPlayer) {
                const logoContainer = document.getElementById("logo-container");

                const videoPlayer = document.getElementById("video-player");
                const videoIframe = videoPlayer.children[0].children[0];

                const categoryMusicElement = document.getElementById("category-music");
                const categoryRapElement = document.getElementById("category-rap");
                const categorySkateElement = document.getElementById("category-skate");


                logoContainer.classList.add("fade-out");
                logoContainer.addEventListener("animationend", () => {
                    logoContainer.classList.add("hide");
                });

                videoIframe.classList.add("fade-in");
                videoIframe.addEventListener("animationend", () => {
                    //logoContainer.classList.add("hide");

                    categoryMusicElement.style.opacity = 1;
                    categoryRapElement.style.opacity = 1;
                    categorySkateElement.style.opacity = 1;

                    categoryMusicElement.classList.remove("fade-in");
                    categoryRapElement.classList.remove("fade-in");
                    categorySkateElement.classList.remove("fade-in");
                });

                categoryMusicElement.classList.add("fade-in");
                categoryRapElement.classList.add("fade-in");
                categorySkateElement.classList.add("fade-in");
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
            setCategory(this.props.data);
        }).then(() => {
            this.onRandomVideo();
        }).then(() => {
            //setViews();
        }).catch(() => {

        }).finally(() => {

        });
    }

    onChangeCategory(e) {
        category = e.target.id.substring(9);

        new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            setActive();
        }).then(() => {
            this.onUpdateVideo();
        }).catch(() => {

        }).finally(() => {

        });
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
                autoplay: 1,
                controls: 0,
                iv_load_policy: 3,
                modestbranding: 1
            },
            frameBorder: "0"
        }

        return (
            <div className="align-items-center justify-content-center">
                <div id="logo-container">
                    <img id="quarantine-logo" onClick={this.onUpdateVideo} src={quarantineImage} width="480" height="268" alt=""/>
                </div>
                <div id="video-container" className="embed-responsive embed-responsive-16by9">
                    <div id="video-player" className="">
                        <YouTube videoId={this.state.videoId} className="random-video" ref={this.youtubePlayerRef} opts={opts} onReady={this.onReady} onEnd={this.onEnd}/>
                    </div>
                </div>
                <div id="category-container" className="embed-responsive">
                    <button onClick={this.onChangeCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><img id="category-music" className="category-image mt-3" src={musicImage}  width="178" height="33" alt="music category"/></button>
                    <button onClick={this.onChangeCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><img id="category-rap" className="category-image mt-3" src={rapImage} width="178" height="33" alt="rap category"/></button>
                    <button onClick={this.onChangeCategory} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><img id="category-skate" className="category-image mt-3" src={skateImage} width="178" height="33" alt="skate category"/></button>
                </div>
                <RandomButton onClick={this.onUpdateVideo} />
            </div>
        );
    }
}

export default VideoPlayer;