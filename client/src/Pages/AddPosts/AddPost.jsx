import "./AddPost.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddFiles from "./AddFiles";
import icon from "../../assets/icon.png";
import Filter from 'bad-words';
import { addPost } from "../../actions/post";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddPost = () => {
  const [postBody, setPostBody] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postVid, setPostVid] = useState("");
  const [postFile, setPostFile] = useState("");
  const [status, setStatus] = useState("");
  const [picDiv, setPicDiv] = useState(false);
  const [vidDiv, setVidDiv] = useState(false);
  const [fileDiv, setFileDiv] = useState(false);
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const filter = new Filter();

  // notifications -------------------------
  const [permission, setPermission] = useState(null);

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);
    });
  };

  const showNotification = (nBody) => {
    if (permission !== "granted") {
      requestPermission();
    } else if (permission === "granted") {
      const notification = new Notification('Hey, check out the new post!', {
        body: `${nBody.substring(0, 50)}...`,
        icon: icon,
      });

      notification.onclick = () => {
        navigate('/Posts');
      };
    }
  };

  // -----------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (User) {
      if (postBody) {
        if (filter.isProfane(postBody)) {
          const profanityWord = filter.clean(postBody);
          alert(` ${profanityWord} Abusive word detected, please remove abusive words and try again`);
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
        showNotification(postBody)
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
      <div className="">
        <h1>Add your public Post</h1>
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
