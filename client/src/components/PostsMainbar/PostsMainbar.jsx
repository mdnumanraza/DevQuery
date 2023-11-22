import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PostsMainbar.css";
import PostsList from "./PostsList";
import AddPost from "../../Pages/AddPosts/AddPost";

const PostsMainbar = () => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to add a post");
      navigate("/Auth");
    } else {
      navigate("/AskPosts");
    }
  };

  return (
    <div className="main-bar">
        <AddPost/>
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Posts</h1>
        ) : (
          <h1>All Posts</h1>
        )}
      </div>
      
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <PostsList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default PostsMainbar;
