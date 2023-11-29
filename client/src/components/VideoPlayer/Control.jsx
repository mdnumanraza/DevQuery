import React from "react";
import {
  Slider,
  Button,
  Tooltip,
  Popover,
  Grid,
} from "@mui/material";

import { 
  FaFastForward,
  FaFastBackward,
  FaPause,
  FaPlay
} from "react-icons/fa";
// import { IoIosSkipForward } from "react-icons/io";
// import { FaVolumeLow,FaVolumeHigh } from "react-icons/fa6";

import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeUp,
  VolumeOff
} from "@mui/icons-material";

// import { makeStyles,withStyles } from '@mui/styles';

import "./Controls.css";

// const useStyles = makeStyles({
//   volumeSlider: {
//     width: "100px",
//     color: "#9556CC",
//   },

//   bottomIcons: {
//     color: "#999",
//     padding: "12px 8px",

//     "&:hover": {
//       color: "#fff",
//     },
//   },
// });

// const PrettoSlider = withStyles({
//   root: {
//     height: "20px",
//     color: "#9556CC",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   thumb: {
//     height: 20,
//     width: 20,
//     backgroundColor: "#9556CC",
//     border: "2px solid currentColor",
//     marginTop: -3,
//     marginLeft: -12,
//     "&:focus, &:hover, &$active": {
//       boxShadow: "inherit",
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: "calc(-50% + 4px)",
//   },
//   track: {
//     height: 5,
//     borderRadius: 4,
//     width: "100%",
//   },
//   rail: {
//     height: 5,
//     borderRadius: 4,
//   },
// })(Slider);

const Control = ({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  onMouseSeekDown,
  controlRef,
  buffer
}) => {
  
  // const classes = useStyles();


  return (
    <div className="control_Container" ref ={controlRef}>
    {!buffer && <>
     
      <div className="top_container">
        <h2>Video PLayer</h2>
      </div>
      <div className="mid__container">
        <div className="icon__btn" onDoubleClick={onRewind}>
          <FaFastBackward  />
        </div>

        <div className="icon__btn" onClick={onPlayPause}>
          {playing ? (
            <FaPause  />
          ) : (
            <PlayArrow fontSize="medium" />
          )}{" "}
        </div>

        <div className="icon__btn">
          <FastForward fontSize="medium" onDoubleClick={onForward} />
        </div>
      </div>
      <div className="bottom__container">
        <div className="slider__container">
          {/* <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          /> */}
          <input type="range" 
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          name="" id="" />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}{" "}
            </div>

            <div className="icon__btn">
              <SkipNext fontSize="medium" />
            </div>

            <div className="icon__btn" onClick={onMute}>
            {mute ? (
                  <VolumeOff fontSize="medium" />
                ) : (
                  <VolumeUp fontSize="medium" />
                )}
            </div>

            <Slider
              // className={`${classes.volumeSlider}`}
              onChange={onVolumeChangeHandler}
              value={volume * 100}
              onChangeCommitted={onVolumeSeekUp}
            />

            <span>{ currentTime} : {duration}</span>
          </div>
          
        </div>
      </div>
      </>}
    </div>
  );
};

export default Control;