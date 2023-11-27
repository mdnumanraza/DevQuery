import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import postsReducer from "./posts";
import usersReducer from "./users";

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  postsReducer,
  usersReducer,
});
