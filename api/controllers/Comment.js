import mongoose from "mongoose";
import Posts from "../models/Posts.js";

export const postComment = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfComments, commentBody,userCommented,userPic } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("post unavailable...");
  }

  updateNoOfPosts(_id, noOfComments);
  try {
    const updatedPost = await Posts.findByIdAndUpdate(_id, {
      $addToSet: { comment: [{ commentBody, userCommented, userId,userPic }] },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

const updateNoOfPosts = async (_id, noOfComments) => {
  try {
    await Posts.findByIdAndUpdate(_id, {
      $set: { noOfComments: noOfComments },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentUser, noOfComments } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post unavailable...");
  }
  // if (!mongoose.Types.ObjectId.isValid(commentId)) {
  //   return res.status(404).send("Comment unavailable...");
  // }
  updateNoOfPosts(_id, noOfComments);

  try {
    // await Posts.updateOne(
    //   { _id },
    //   { $pull: { comment: { userId:commentUser } } }
    // );
    const post = Posts.findById(_id);
    if (!post) {
      return res.status(404).send("Post not found...");
    }

    const updatedComments = post.comment.filter(comment => comment.userId !== commentUser);

    await Posts.findByIdAndUpdate(
      _id,
      { $set: { comment: updatedComments } },
      { new: true } 
    );
    
    res.status(200).json({ message: "Successfully deleted...", updatedComments });
  } catch (error) {
    res.status(405).json(error);
  }
};
