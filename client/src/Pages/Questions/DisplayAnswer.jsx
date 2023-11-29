import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../components/Avatar/Avatar";
import { deleteAnswer } from "../../actions/question";
import CodeDisplay from "../../components/CodeDisplay";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";


const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };
  
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>

          <p className="question-body" dangerouslySetInnerHTML={{__html: ans.answerBody}}></p>

          <div className="q-media">
            {ans.ansImg &&
              <img src={ans.ansImg} width="200px" alt="" />
            }
            {ans.ansVid &&
              // <video controls src={ans.ansVid} width="500px" />
             <VideoPlayer vidUrl={ans.ansVid} />
            }
            {ans.ansCode &&
              
                <CodeDisplay code={ans.ansCode}/>
                
             
            }
          </div>
          
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {User?.result?._id === ans?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
               {ans.userPic?  
               <img src={ans.userPic} alt="" width='30px' height='30px' style={{borderRadius:'50%'}} />
                 :
                <Avatar
                  backgroundColor="lightgreen"
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>}
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
