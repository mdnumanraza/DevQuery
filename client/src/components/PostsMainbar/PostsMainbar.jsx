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

  const postsList = useSelector((state) => state.postsReducer);
  console.log(postsList)

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to add a post");
      navigate("/Auth");
    } else {
      navigate("/Posts");
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
        {postsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{postsList.data.length}posts</p>
            <PostsList postsList={postsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default PostsMainbar;
