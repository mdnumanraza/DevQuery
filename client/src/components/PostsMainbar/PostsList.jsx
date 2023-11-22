import React from "react";
import Posts from "./Posts";
const PostsList = ({ questionsList }) => {
  return (
    <>
      {questionsList.map((question) => (
        <Posts question={question} key={question._id} />
      ))}
    </>
  );
};

export default PostsList;
