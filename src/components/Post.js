import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import NearMeRoundedIcon from "@material-ui/icons/NearMeRounded";
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "../firebase";
import firebase from "firebase";

const Post = ({ username, caption, imageUrl, postId, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setComment("");
  };

  useEffect(() => {
    let unSubscribe;
    if (postId) {
      unSubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => unSubscribe();
  }, [postId]);

  return (
    <div className="post__container">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Edward"
          src="https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_579.jpg"
        />
        <div>
          <h3>{username}</h3>
          <p>Add your location</p>
        </div>
      </div>

      <img alt="" className="post__image" src={imageUrl} />

      <div className="post__icons">
        <div className="left__icon">
          <FavoriteBorderIcon />
          <ChatBubbleOutlineRoundedIcon />
          <NearMeRoundedIcon />
        </div>
        <div className="right__icon">
          <BookmarkBorderRoundedIcon />
        </div>
      </div>

      <h4 className="post__text">
        <b>{username}</b> {caption}
      </h4>

      <div className="User_comment">
        <div>
          {" "}
          <b className="all_comments">All {comments.length} comments</b>
        </div>
        {comments.map((item) => (
          <p>
            <b key={item.id}>{item.username} </b> {item.comment}
          </p>
        ))}
      </div>

      <form className="form_comment">
        <input
          type="text"
          valu={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="comment_input"
        />

        <button
          className="post_comment"
          type="submit"
          disabled={!comment}
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
