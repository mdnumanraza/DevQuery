import mongoose from "mongoose";

const PostsSchema = mongoose.Schema({
  
  postBody: { 
    type: String, 
    required: "Post must have a body" 
  },
  postImg: { 
    type: String
  },
  postVid: { 
    type: String
  },
  postFile: { 
    type: String
  },

  noOfComments: { 
    type: Number, 
    default: 0 
  },
  Likes: { 
    type: Number, 
    default: 0
  },
  userPosted: { 
    type: String, 
    required: "Post must have an author" 
  },
  userPic: { 
    type: String, 
  },
  userId: { 
    type: String 
  },
  postedOn: { 
    type: Date, 
    default: Date.now 
  },
  comment: [
    {
      commentBody: String,
      userCommented: String,
      userId: String,
      userPic: String,
      commentedOn: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
});

export default mongoose.model("Post", PostsSchema);
