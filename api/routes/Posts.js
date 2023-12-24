import express from "express";

import {
  AddPost,
  getAllPosts,
  deletePost,
  likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

import { 
  getAllNotifications,
  markAllNotificationsAsRead,
  deleteNotification
} from "../controllers/notifications.js";

const router = express.Router();

    router.post("/add", auth,  AddPost);
    router.get("/get", getAllPosts);
    router.delete("/delete/:id", auth,  deletePost);
    router.patch("/like/:id", auth, likePost);
    router.get('/notification', getAllNotifications);
    router.put('/notification', markAllNotificationsAsRead);
    router.delete('/notification',deleteNotification)


export default router;
