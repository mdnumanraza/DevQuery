import "./AddPost.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import AddFiles from "./AddFiles"
import icon from "../../assets/icon.png"

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


  // notifications 
  const [permission, setPermission] = useState(null);

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);
    });
  };

  const showNotification = (nBody) => {
    if(permission !== "granted"){
      requestPermission();
    }
    else if (permission === "granted") {
      const notification = new Notification('Hey, check out the new post!', {
        body: `${nBody.substring(0,50)}...`,
        icon: icon, 
      });

      notification.onclick = () => {
        navigate('/Posts')
      };
    }
  };


  
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
        showNotification(postBody)
        
      } else alert("Please your post and image of the post");
    } else alert("Login to add Post");
  };

console.log('env',process.env.REACT_APP_API_KEY)
  return (
    <div className="">
      <div className="">
        <h1>Add your public Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
           h{process.env.REACT_APP_API_KEY}
          
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
