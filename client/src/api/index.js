import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "https://stack-overflow-clone-tau.vercel.app/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const apiurl = "http://localhost:5000"
// export const apiurl =  "https://stack-overflow-clone-tau.vercel.app/"
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value }); 
  export const postAnswer = (id, noOfAnswers, answerBody,  ansImg, ansVid, ansCode, userAnswered, userId, userPic) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, ansImg, ansVid, ansCode, userAnswered, userId ,userPic});
  export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

  export const getAllUsers = () => API.get("/user/getAllUsers");
  export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
  
  //posts routes
  export const addPost = (postData) => API.post("/posts/add", postData);
  export const getAllPosts = () => API.get("/posts/get");
  export const deletePost = (id) => API.delete(`/posts/delete/${id}`);
  
  export const likePost = (id, userId) =>
    API.patch(`/posts/like/${id}`, { userId});

  // comment routes
  export const postComment = (id, noOfComments, commentBody, userCommented, userId, userPic) =>
    API.patch(`/comment/post/${id}`, { noOfComments, commentBody,  userCommented, userId, userPic});
  
  export const deleteComment = (id, commId, noOfComments) =>
    API.patch(`/comment/delete/${id}`, { commId, noOfComments });
