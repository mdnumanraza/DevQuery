import React from "react";
import { 
  FaFastBackward,
  FaPause,

} from "react-icons/fa";

import {
  FastForward,
  PlayArrow,
} from "@mui/icons-material";

import "./Controls.css";

const Control = ({
  cntrlVisibility,
  onPlayPause,
  playing,
  onRewind,
  onForward,
  controlRef,
  buffer
}) => {

  
  

  return (
    <div className="control_Container" ref ={controlRef} style={{display:`${cntrlVisibility}`, transitionDelay:"3s", transitionProperty:"display"}}>
    {!buffer && 
     
      <div className="mid__container" >
        <div className="icon__btn bskip" onDoubleClick={onRewind} >
          <FaFastBackward onClick={onRewind} />
        </div>

        <div className="icon__btn play" onDoubleClick={onPlayPause}>
          {playing ? (
            <FaPause onClick={onPlayPause}  />
          ) : (
            <PlayArrow fontSize="medium"  onClick={onPlayPause} />
          )}
        </div>

        <div className="icon__btn fskip" onDoubleClick={onForward}>
          <FastForward fontSize="medium" onClick={onForward} />
        </div>
      </div>
    }
     
    </div>
  );
};

export default Control;