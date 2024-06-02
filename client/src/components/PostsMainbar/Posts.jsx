import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Posts.css";
import { Link } from "react-router-dom";

import likefilled from '../../assets/likefilled.png'
import likeoutline from '../../assets/likeoutline.png'
import comment from "../../assets/comment.svg";
import share from "../../assets/share.svg";
import send from "../../assets/send.svg";

import Filter from "bad-words";

import { useDispatch, useSelector } from "react-redux";
import DisplayComments from "../../Pages/PublicSpace/DisplayComments";
import { deletePost, likePost, postComment } from "../../actions/post";
import {useNavigate } from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import dUser from '../../assets/duser.png'
import deleteBtn from '../../assets/delete.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {hateWords} from '../../assets/badWords'

const Posts = ({ post }) => {
  const [commentBody, setCommentBody] = useState("");
  const [commDiv, setCommDiv] = useState(false);
  const [like, setLike] = useState(likeoutline);

  const filter = new Filter();
  filter.addWords(...hateWords);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.currentUserReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const id = post._id;
      const noOfComments = post.noOfComments + 1;
      const userCommented = user.result.name;
      const userId = user.result._id;
      const userPic = user.result.pic;
      if (commentBody) {
        if (filter.isProfane(commentBody)) {
          alert(
            "Abusive word detected , please remove abusive words and try again"
          );
          toast.dark("Don't Say that 😳")
          setCommentBody("");
          return;
        } else {
          dispatch(
            postComment({
              id,
              noOfComments,
              commentBody,
              userCommented,
              userId,
              userPic,
            })
          );
          setCommentBody("");
          toast.success("Comment added...")
        }
      } else toast.warn("Please enter all the fields");
    } else alert("Login to add Post");
  };

  const toggleCommentDiv = () => {
    setCommDiv(!commDiv);
  };


  const handleLikes = () => {
    if(user){
      try {        
          dispatch(likePost(post._id, user.result._id));
          if(post.Likes.includes(user?.result._id)){
            toast.error('Unliked 😕')
          }else{
            toast.success('Liked successfully 💖')
          }
      } catch (e) {
        console.log(e.message)
      }
    }else{
      alert("Please login/register  to like ");
    }
  };

  useEffect(() => {
    const likes = post.Likes;
    const liked = likes.includes(user?.result._id);
  
    if (liked) {
      setLike(likefilled);
    } else {
      setLike(likeoutline);
    }
  }, [post.Likes, user?.result._id, handleLikes]);



  const handleDelete = ()=>{
    if(user?.result?._id=== post.userId){
      try {
        dispatch(
          deletePost(post._id)
          )
          toast.success("Deleted successfully")
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className="posts-box">
      <ToastContainer/>
      
        <div className="card">
          <div className="top">
            <div className="userDeatils">
              <div className="profileImg">
                
             <Link
                   to={`/Users/${post?.userId}`}
                   style={{ color: "white", textDecoration: "none" }}
                 >
                    <img src={post.userPic || dUser} alt="user" className="cover" />
              </Link>
                
              </div>
              <h3 className="user-posted">{post.userPosted}</h3>
            </div>
            
            <div className="dots">

           {(user?.result?._id=== post?.userId) &&
              <div className="dot-div" style={{cursor:"pointer"}} onClick={handleDelete}>
                <img src={deleteBtn} width={'27px'} alt="deleteBtn" />
              </div>
            }
            </div>
          </div>
         
          <div className="imgBg">
           { post.postImg &&
           <img src={post.postImg} alt="bg" className="cover" />}
          </div>
          
          <div className="media">
          {post.postVid &&
              // <video src={post.postVid} controls ></video>
              <VideoPlayer vidUrl={post.postVid} />
            }
            {post.postFile &&
             <embed 
             src={post.postFile} 
             width="100%"  
             type="application/pdf"
             frameBorder="0"
             scrolling="auto" 
             />

            }
          </div>
          <div className="btns">
            <div className="left">

              <div className="likes" onClick={handleLikes} style={{cursor:'pointer',margin:'0 5px'}}>
                <img src={like} alt="" />
                {post.Likes.length}
              </div>

              <div className="likes" onClick={toggleCommentDiv}  style={{cursor:'pointer',margin:'0 5px'}}>
                <img src={comment} alt="comment" />
                {post.noOfComments}
              </div>

              <div className="likes"  style={{cursor:'pointer',margin:'0 5px'}}>
                  <img src={share} alt="share" />
              </div>

            </div>
          </div>
          <div className="p-10">
            <h4 className="message">{post.postBody}</h4>
            <h4 className="comments">
             
               
                 {!commDiv ?
                 ( <div onClick={toggleCommentDiv} style={{ cursor: "pointer" }}>
                  {(post.comment.length!==0 ) ?
                    `View ${post.comment.length===1?'':'all'} ${post.noOfComments} ${post.comment.length===1?'comment':'comments'}` : 'No comments'
                  } 
                </div>):
                (
                  <div onClick={toggleCommentDiv} style={{ cursor: "pointer" }}>
                   {(post.comment.length!==0 ) ?
                    `Hide Comments` : 'No comments'
                  }
                </div>
                )
                }
             
            </h4>
          </div>
          <div className="addComments">
            <div className="userImg">
              <img src={user?.result?.pic || dUser} alt="user" className="cover" />
            </div>

            <form onSubmit={handleSubmit} className="comm-form">
              <input
                type="text"
                className="text"
                placeholder="Add a comment..."
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
              />
              <button className="submit">
                <img src={send} width="40px" alt="send" />
              </button>
            </form>
          </div>
          <div className="display-tags-time postTime">
            <p className="display-time">
              Posted {moment(post.updatedAt).fromNow()} by {post.userPosted}
            </p>
          </div>
        </div>
      
      {commDiv && <DisplayComments post={post} />}
    </div>
  );
};

export default Posts;
