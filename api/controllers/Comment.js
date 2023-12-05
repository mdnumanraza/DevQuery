import mongoose from "mongoose";
import Posts from "../models/Posts.js";

export const postComment = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfComments, commentBody,userCommented,userPic } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("post unavailable...");
  }

  updateNoOfComments(_id, noOfComments);
  try {
    const updatedPost = await Posts.findByIdAndUpdate(_id, {
      $addToSet: { comment: [{ commentBody, userCommented, userId,userPic }] },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

const updateNoOfComments = async (_id, noOfComments) => {
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
  const { commId, noOfComments } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(commId)) {
    return res.status(404).send("Comment unavailable...");
  }
  updateNoOfComments(_id, noOfComments);
  try {
    await Posts.updateOne(
      { _id },
      { $pull: { comment: { _id: commId } } }
    );
    res.status(200).json({ message: "Successfully deleted..." ,Posts});
  } catch (error) {
    res.status(405).json(error);
  }
};

