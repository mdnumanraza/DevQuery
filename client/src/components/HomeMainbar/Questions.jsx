import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { BiSolidUpvote } from "react-icons/bi";
import { RiQuestionAnswerFill } from "react-icons/ri";

const Questions = ({ question }) => {
  return (
    <div className="card-q">
      <div className="card-body">

        <div className="upper">

          <div className="card-content">
            <Link to={`/Questions/${question._id}`} className="question-title">
              {question.questionTitle.length > (window.innerWidth <= 400 ? 70 : 90)
                ? question.questionTitle.substring(
                  0,
                  window.innerWidth <= 400 ? 70 : 90
                ) + "..."
                : question.questionTitle}
            </Link>
          </div>

          {/* votes and answers */}
          <div className="card-votes-answers">
            <div className="votes">
              <p style={{display:'flex',gap:'10px'}}>
                <BiSolidUpvote />
                <p className="count">{question.upVote.length - question.downVote.length}</p>
              </p>
                {/* <p style={{ fontSize: '12px' }}>(votes)</p> */}
            </div>
            <div className="answers">
              <p style={{display:'flex',gap:'10px'}}>
                  <RiQuestionAnswerFill />
                  <p className="count">{question.noOfAnswers}</p>
              </p>
                  {/* <p style={{ fontSize: '12px' }}> (answers)</p> */}
            </div>
          </div>

        </div>

        <div className="card-tags-time">
          <div className="tags">
            {question.questionTags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <p className="time">
            asked {moment(question.askedOn).fromNow()} by <span style={{textDecoration:'underline', color:'#dadada'}}> {question.userPosted} </span> 
          </p>
        </div>

      </div>



    </div>
  );
};

export default Questions;
