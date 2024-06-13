"use client";
import classes from "./comments.module.css";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

export default function DisplayComment(props) {
  const [replies, setReplies] = useState();
  const [reply, setReply] = useState();
  const [hasReplies, setHasReplies] = useState(false);
  const [showCommentField, setShowCommentField] = useState(false);
  async function commentHandler(id) {
    const response = await fetch("/api/reply", {
      method: "POST",
      body: JSON.stringify({ id, reply }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setShowCommentField(!showCommentField);
    const fetchedResponse = await fetch("/api/comments");
    const fetchedComments = await fetchedResponse.json();
    props.setComments(fetchedComments);
    //window.location.href = "/home";
  }
  async function hasReplyComments(id) {
    const response = await fetch("/api/replies", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    const commentreplies = await response.json();
    if (commentreplies.results.length > 0) {
      console.log("hascommentreplies", commentreplies);
      setHasReplies(true);
    } else {
      console.log("hascommentreplies", commentreplies);
      setHasReplies(false);
    }
  }
  useEffect(() => {
    async function fetchReplies() {
      const response = await fetch("/api/replies", {
        method: "POST",
        body: JSON.stringify({ id: props.comment.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      setReplies(data.results);
    }
    hasReplyComments(props.comment.id);

    fetchReplies();
  }, [props.comment]);

  let statusClasses = "";
  let replyCommentsClasses = "";
  let commentStatusClasses = "";
  let line = "";
  if (props.comment.reply === null) {
    if (props.commentIndex % 2 === 0) {
      statusClasses = classes.evenCommentColor;
      line = "";
    } else {
      statusClasses = classes.singleCommentColor;
      line=<hr />
    }
    commentStatusClasses = classes.commentText;
  } else {
    commentStatusClasses = classes.commentAnswer;
  }
  if (hasReplies) {
    replyCommentsClasses = classes.hideReply;
  } else {
    replyCommentsClasses = classes.showReply;
  }

  return (
    <>
      <div className={`${statusClasses}`}>
        <p className={`${commentStatusClasses} `}>{props.comment.comment}</p>
        {line}
        
        {/* {props.comment.comment? props.comment.comment: props.comment.reply? props.comment.reply: "comment"} */}
        {/* {comment.comment || (comment.reply && comment.reply.comment.comment)} */}
        {showCommentField && <div>
          <input
            type="text"
            className={classes["comment-align"]}
            onChange={(event) => setReply(event.target.value)}
          />
          <button type="button" className={classes["comment-btn2"]} onClick={() => commentHandler(props.comment.id)}>submit</button>
        </div>}

        {!showCommentField && (
          <Button variant="primary" type="button" className={`${classes["comment-btn2"]} ${replyCommentsClasses}`} onClick={() => setShowCommentField(!showCommentField)}>پاسخ</Button>
          // <button
          //   type="button"
          //   className={`${classes["comment-btn2"]} ${replyCommentsClasses}`}
          //   //onClick={() => commentHandler(props.comment.id)}
          //   onClick={() => setShowCommentField(!showCommentField)}
          // >
          //   پاسخ
            
          // </button>
        )}
        {replies &&
          replies.map((reply, index) => (
            <div key={reply.id} className={classes["comment-p"]}>
               
              <DisplayComment
                comment={reply}
                setComments={props.setComments}
                commentIndex={props.commentIndex}
              />
             
            </div>
            
          ))}
           
      </div>
    </>
  );
}
