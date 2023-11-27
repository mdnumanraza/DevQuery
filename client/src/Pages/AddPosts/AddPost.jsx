import "./AddPost.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddFiles from "./AddFiles"

import Filter from 'bad-words';

import { addPost } from "../../actions/post";


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

  const filter = new Filter();


  if(User&& flag){
    setUserPic(User.result.pic)
    setUser(User.result.name)
    setFlag(false)
  }
  
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(postBody)
    if (User) {
    
      if ( postBody ) {

        if(filter.isProfane(postBody)){
          const profanityWord = filter.clean(postBody);
          alert(` ${profanityWord} Abusive word detected , please remove abusive words and try again`);
          setPostBody("");
          return
        }
        dispatch(
          addPost(
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
        setPostBody("");
        setPostImg("");
        setPostVid("");
        setPostFile("");
        
      } else alert("Please your post and image of the post");
    } else alert("Login to add Post");
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
            <AddFiles 
                postImg={postImg} 
                setPostImg={setPostImg} 
                postVid={postVid} 
                setPostVid={setPostVid}
                postFile={postFile} 
                setPostFile={setPostFile}
            />
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
