import "./AddPost.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddFiles from "./AddFiles";
import Filter from 'bad-words';
import { addPost } from "../../actions/post";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hateWords } from "../../assets/badWords";

import firebase from 'firebase/compat/app'
import Notifications from "./Notifications";
import postAnalyzer from "./postAnalyzer";


const AddPost = () => {
  const [postBody, setPostBody] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postVid, setPostVid] = useState("");
  const [postFile, setPostFile] = useState("");
  const [status, setStatus] = useState("");
  const [picDiv, setPicDiv] = useState(false);
  const [vidDiv, setVidDiv] = useState(false);
  const [fileDiv, setFileDiv] = useState(false);
  

  const handleGetNotifs = async (userPosted, postBody) => {
    try {
      const id = Math.random() * Math.floor(Math.random()*1000);
      const notifType = 'post'
      const notificationData = {userPosted,postBody,id,notifType}
      // Save data to Firebase Realtime Database
      const notificationsRef = firebase.database().ref('notifications');
      await notificationsRef.push(notificationData);

      console.log('Notification saved successfully\n'+ userPosted +" "+ postBody + "\n" +id);
    } catch (error) {
      console.log('Error saving notification:', error);
    }
  };


  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const filter = new Filter();
  filter.addWords(...hateWords)



  const handleSubmit = async(e) => {
    e.preventDefault();

    if (User) {
      if (postBody) {
        
        // hate ful speech detection
        const toxicityScore = await postAnalyzer(postBody);
        console.log(toxicityScore);
        if(toxicityScore>0.13){
          alert(` hateful speech detected ⚠`);
          toast.dark("Please don't use any hateful speech")
          setPostBody("");
          return
        }

        //abusiv words detection
        if (filter.isProfane(postBody)) {
          const profanityWord = filter.clean(postBody);
          alert(` ${profanityWord} Abusive word detected ⚠`);
          toast.dark("Please don't use any abusive words")
          setPostBody("");
          return;
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
        const postData = postBody.substring(0,20);
        handleGetNotifs( User.result.name, postData)

        setPostBody("");
        setPostImg("");
        setPostVid("");
        setPostFile("");
        setStatus("");
        setFileDiv(false);
        setPicDiv(false);
        setVidDiv(false);
        toast.success('Post added Successfully')

      } else {
        // alert("Please enter your post");
        toast.warn("Add any text to post")
      }
    } else {
      alert("Login to add Post");
    }
  };

  return (
    <div className="">
      <ToastContainer/>
      <div className="add-posts">
        <div  className="post-head" style={{display:'flex', justifyContent:'space-between'}}>

        <h1 className="post-h1">Add your public Post</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-body">
              <textarea
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
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
                status={status}
                setStatus={setStatus}
                picDiv={picDiv}
                setPicDiv={setPicDiv}
                vidDiv={vidDiv}
                setVidDiv={setVidDiv}
                fileDiv={fileDiv}
                setFileDiv={setFileDiv}
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
