import * as api from "../api/index";

export const addPost= (postData) => async (dispatch) => {
  try {
    const { data } = await api.addPost(postData);
    dispatch({ type: "ADD_POST", payload: data });
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllPosts = () => async (disptach) => {
  try {
    const { data } = await api.getAllPosts();
    disptach({ type: "FETCH_ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    await api.likePost(id, userId);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const postComment = (commentData) => async (dispatch) => {
  try {
    const { id, noOfComments, commentBody,userCommented ,userId ,userPic } = commentData;
    const { data } = await api.postComment(
      id, noOfComments, commentBody,userCommented ,userId ,userPic);
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, commId, noOfComments) => async (dispatch) => {
  try {
    await api.deleteComment(id, commId, noOfComments);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};
