import Post from "../models/Posts.js";
import mongoose from "mongoose";
import User from "../models/auth.js";
import notifications from "../models/notifications.js";

export const AddPost = async (req, res) => {

    const postData = req.body;
    const userId = req.userId;
    const userPic = req.body.userPic;
    const userPosted = req.body.userPosted
    const addPost = new Post({ ...postData,userId, userPic });
    const notifData = postData.postBody.substring(0,50)
    try {
      await addPost.save();

      await notifications.create({
        user: userId,
        userPosted,
        title: `New post by ${userPosted}`,
        type: 1,
        text: `${notifData}...`,
        read: false
      })


      res.status(200).json("Added a post successfully");
    } catch (error) {
      console.log(error);
      res.status(409).json("Couldn't add a new post");
    }
  };



export const getAllPosts = async (req, res) => {
  try {
    const postList = await Post.find().sort({ askedOn: -1 });
    res.status(200).json(postList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("post unavailable...");
  }

  try {
    await Post.findByIdAndRemove(_id);
    res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post unavailable...");
  }

  try {
    const post = await Post.findById(_id);

    const likedIndex = post.Likes.findIndex((likedUserId) => likedUserId === String(userId));

    if (likedIndex === -1) {
      // User hasn't liked the post, add the like
      post.Likes.push(userId);
    } else {
      // User already liked the post, remove the like
      post.Likes = post.Likes.filter((likedUserId) => likedUserId !== String(userId));
    }

    await Post.findByIdAndUpdate(_id, post);
    const likesCount = post.Likes.length;

    res.status(200).json({ message: "Likes updated successfully...", likesCount, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


