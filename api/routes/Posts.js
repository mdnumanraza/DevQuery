import express from "express";

import {
  AddPost,
  getAllPosts,
  deletePost,
  likePost,
  updateUserPics
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";


const router = express.Router();

    router.post("/add", auth,  AddPost);
    router.get("/get", getAllPosts);
    router.delete("/delete/:id", auth,  deletePost);
    router.patch("/like/:id", auth, likePost);
    router.put("/updatePic", updateUserPics);


export default router;
