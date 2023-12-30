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
import {io} from 'socket.io-client';
import Notifications from "./Notifications";
import { apiurl } from "../../api";

import axios from 'axios';
import Pusher from 'pusher-js';

const AddPost = () => {
  const [postBody, setPostBody] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postVid, setPostVid] = useState("");
  const [postFile, setPostFile] = useState("");
  const [status, setStatus] = useState("");
  const [picDiv, setPicDiv] = useState(false);
  const [vidDiv, setVidDiv] = useState(false);
  const [fileDiv, setFileDiv] = useState(false);


  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  
  // const socket = io(apiurl);
  
//   const fetchNotifications = async()=>{
//     const response = await fetch(apiurl+'/posts/notification')
//     const notifs = await response.json();
//     if(response.ok){
//       const notifArray = [...new Set(notifs)]
//         setNotifications(notifArray);
//         setNotificationCount(notifArray.length)
//         console.log(notifs)
//     }else{
//         console.log('error in fetching notifications')
//     }
// }
// useEffect(()=>{
//   fetchNotifications();
// },[])

  // const sendNotif = async(notifData)=>{
    
  //  try {
  //    const response = await fetch(apiurl+'posts/addnotif',{
  //      method:'POST',
  //      credentials:true,
  //      headers: {
  //        'Content-Type': 'application/json',
  //      },
  //      body: JSON.stringify(notifData),
  //    })
 
  //    if(response.ok){
  //      console.log("notif sent");
  //    }
  //  } catch (error) {
  //     console.log(error);
  //  }
    

  // }

  const handleGetNotifs = async (userPosted, postBody) => {
    try {
      await axios.post(apiurl + '/posts/notification', { userPosted, postBody });

    } catch (error) {
      console.error('Error posting:', error);
    }
  };


  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const filter = new Filter();
  filter.addWords(...hateWords)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (User) {
      if (postBody) {
        if (filter.isProfane(postBody)) {
          const profanityWord = filter.clean(postBody);
          alert(` ${profanityWord} Abusive word detected, please remove abusive words and try again`);
          toast.dark("Don't Say that 😳")
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
        handleGetNotifs( User.result.name, postBody)
        // const socket = io(apiurl);

        // socket.emit('newPost', {
        //   postBody,
        //   userPosted: User.result.name,
        //   userPic: User.result.pic,
        // });



            // const notifData = {
            //   body:postBody,
            //   sender:User.result.name
            // }

            // sendNotif(notifData);

        // showNotification(postBody)
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

        <div className="notif">
          <Notifications 
          navigate={navigate}
          notifications={notifications}
          setNotifications={setNotifications}
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
          handleSubmit={handleSubmit}
          // fetchNotifications={fetchNotifications}
          />
        </div>
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
