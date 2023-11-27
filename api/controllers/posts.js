import Post from "../models/Posts.js";
import mongoose from "mongoose";

export const AddPost = async (req, res) => {
  const postData = req.body;
  const userId = req.userId;
  const userPic = req.body.userPic;
  const addPost = new Post({ ...postData,userId, userPic });
  try {
    await addPost.save();
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
  const { Likes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("post unavailable...");
  }

  try {
    const post = await Post.findByIdAndUpdate(_id, Likes);
    res.status(200).json({post,Likes})
  }catch(e){
    res.status(404).json({ message: e.message });
  }
};
