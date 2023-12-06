import "./Controls.css";
import ReactPlayer from "react-player";
import { Container } from "@mui/material";
import Control from "./Control";
import { useState, useRef } from "react";
import loadingSvg from "../../assets/loadingSvg.svg"


function VideoPlayer({vidUrl}) {
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);

const [cntrlVisibility, setCntrlVisibility] = useState("none")


  const [videoState, setVideoState] = useState({
    playing: false,
    buffer: true,
  });


  const { playing, buffer} = videoState;


  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 10);
  };

  const handleFastFoward = () => {
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  const bufferStartHandler = () => {
    // console.log("Bufering...");
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    // console.log("buffering stoped..");
    setVideoState({ ...videoState, buffer: false });
  };


  return (
    <div className="video_container">
     
      <Container maxWidth="md" justify="center">
        <div className="player__wrapper" 
        onMouseOver={()=>{setCntrlVisibility(" ")}} 
        onClick={()=>{setCntrlVisibility(" ")}} 
        onMouseOut={()=>setCntrlVisibility("none")}
        >
          <ReactPlayer
            controls
            ref={videoPlayerRef}
            className="player"
            url={vidUrl}
            width="100%"
            height="100%"
            playing={playing}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
          />

          {buffer && 
          <div className="loading">
            <img width="60px" src={loadingSvg} alt="load" />
            <p>Loading...</p> 
          </div>}

          <Control
            cntrlVisibility={cntrlVisibility}
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            buffer={buffer}
          />
        </div>
      </Container>
    </div>
  );
}

export default VideoPlayer;