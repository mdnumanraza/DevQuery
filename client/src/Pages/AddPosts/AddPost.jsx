import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AddPost.css";
import { askQuestion } from "../../actions/question";
import AddFiles from "./AddFiles"

const AddPost = () => {
  const [postBody, setPostBody] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postVid, setPostVid] = useState("");
  const [postFile, setPostFile] = useState("");
  const [userPic, setUserPic] = useState("")
  const [user, setUser] = useState("")
  const [flag, setFlag] = useState(true)

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
 
  const navigate = useNavigate();


  if(User&& flag){
    setUserPic(User.result.pic)
    setUser(User.result.name)
    setFlag(false)
  }
  
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(postBody)
    if (User) {
    
      if ( postBody && postImg) {
        dispatch(
          askQuestion(
            {
              postBody,    
              postImg,
              postVid,
              postFile,
              userPosted: User.result.name,
              userPic: User.result.pic,
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };


  return (
    <div className="">
      <div className="">
        <h1>Add your public Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
           
            <label htmlFor="ask-ques-body">
              <textarea
              value={postBody}
              onChange={(e)=>setPostBody(e.target.value)}
              placeholder="What's on your mind?"
              className=""
            />
            </label>

           <div className="add-files">
            <AddFiles/>
           </div>
          </div>
          <button
            
            type="submit"
            className="review-btn"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
