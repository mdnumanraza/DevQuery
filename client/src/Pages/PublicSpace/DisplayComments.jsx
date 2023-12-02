import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../components/Avatar/Avatar";
import { deleteComment } from "../../actions/post";


const DisplayComments = ({post}) => {

  const User = useSelector((state) => state.currentUserReducer);
  const id = User?.result?._id
  const dispatch = useDispatch();

  const handleDelete = (commentId, noOfComments) => {
    if(User){
      try {
        dispatch(deleteComment(id, commentId, noOfComments - 1));
        
      } catch (error) {
        console.log(error)
      }
    }
  };


  return (
    <div>
      {post.comment.map((comm) => (
        <div className="display-ans" key={comm._id}>

          <p className="question-body" >{comm.commentBody}</p>

       
          
          <div className="question-actions-user">
            <div>
              
              {User?.result?._id === comm?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(User?._id, comm.noOfComments)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>Commented {moment(comm.commentedOn).fromNow()}</p>
              <Link
                to={`/Users/${comm.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
               {comm.userPic?  
               <img src={comm.userPic} alt="" width='30px' height='30px' style={{borderRadius:'50%'}} />
                 :
                <Avatar
                  backgroundColor="lightgreen"
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {comm.userCommented.charAt(0).toUpperCase()}
                </Avatar>}
                <div>{comm.userCommented}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayComments;
