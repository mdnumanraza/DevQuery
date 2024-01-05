import React from "react";
import Posts from "./Posts";
const PostsList = ({ postsList }) => {
  const ascendingList = postsList.reverse();
  console.log(ascendingList)
  return (
    <>
      {ascendingList.map((post) => (
        <Posts post={post} key={post._id} />
      ))}
    </>
  );
};

export default PostsList;
