import React, { useRef, useState } from "react";
import { Container } from "@mui/material";
import Control from "./Control";
import loadingSvg from "../../assets/loadingSvg.svg";
import "./Controls.css";

function VideoPlayer({ vidUrl }) {
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);

  const [cntrlVisibility, setCntrlVisibility] = useState("none");

  const [videoState, setVideoState] = useState({
    playing: false,
    buffer: false,
  });

  const { playing, buffer } = videoState;

  const playPauseHandler = () => {
    const video = videoPlayerRef.current;
  
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  
    setVideoState((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };

  const rewindHandler = () => {
    videoPlayerRef.current.currentTime -= 10;
  };

  const handleFastForward = () => {
    videoPlayerRef.current.currentTime += 10;
  };

  const bufferStartHandler = () => {
    setVideoState((prevState) => ({ ...prevState, buffer: true }));
  };

  const bufferEndHandler = () => {
    setVideoState((prevState) => ({ ...prevState, buffer: false }));
  };
// if(cntrlVisibility===""){
//   setTimeout(()=>{
//     setCntrlVisibility("none")
//   },3000)

// }

  return (
    <div className="video_container">
      <Container maxWidth="md" justify="center">
        <div
          className="player__wrapper"
          onMouseOver={() => setCntrlVisibility("")}
          onClick={() => setCntrlVisibility("")}
         
          onMouseOut={() => setCntrlVisibility("none")}
        >
          <video
            controls
            ref={videoPlayerRef}
            className="player"
            width="100%"
            height="100%"
            onPlay={() => {setVideoState({ ...videoState, playing: true }) }}
            onPause={() => {setVideoState({ ...videoState, playing: false })}}
            onTimeUpdate={() => setVideoState({ ...videoState, buffer: false })}
            onWaiting={bufferStartHandler}
            onPlaying={bufferEndHandler}
          >
            <source src={vidUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {buffer && (
            <div className="loading">
              <img width="60px" src={loadingSvg} alt="load" />
              <p>Loading...</p>
            </div>
          )}

          <Control
            cntrlVisibility={cntrlVisibility}
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastForward}
            buffer={buffer}
          />
        </div>
      </Container>
    </div>
  );
}

export default VideoPlayer;
