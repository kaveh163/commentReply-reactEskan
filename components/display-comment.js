"use client";
import classes from "./comments.module.css";
import { useState, useEffect } from "react";

export default function DisplayComment(props) {
  const [replies, setReplies] = useState();
  const [reply, setReply] = useState();

  async function commentHandler(id) {
    const response = await fetch("/api/reply", {
      method: "POST",
      body: JSON.stringify({ id, reply }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    const fetchedResponse = await fetch("/api/comments");
    const fetchedComments = await fetchedResponse.json();
    props.setComments(fetchedComments);
    //window.location.href = "/home";
  }
  useEffect(() => {
    async function fetchReplies() {
      const response = await fetch("/api/replies", {
        method: "POST",
        body: JSON.stringify({ id: props.comment.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("replies", data);
      setReplies(data.results);
    }
    fetchReplies();
  }, [props.comment]);

  console.log("commentreply", props.comment.reply);
  let statusClasses = "";
  if(props.comment.reply === null) {
    if(props.commentIndex % 2 === 0) {
      statusClasses = classes.evenCommentColor;
    } else {
      statusClasses = classes.singleCommentColor;
    }
    
  }


  return (
    <>
      <div className={`${statusClasses}`}>
        {props.comment.comment}
        {/* {props.comment.comment? props.comment.comment: props.comment.reply? props.comment.reply: "comment"} */}
        {/* {comment.comment || (comment.reply && comment.reply.comment.comment)} */}
        <input
          type="text"
          className={classes["comment-align"]}
          onChange={(event) => setReply(event.target.value)}
        />
        <button
          type="button"
          className={classes["comment-btn2"]}
          onClick={() => commentHandler(props.comment.id)}
        >
          reply
        </button>
        {replies &&
          replies.map((reply, index) => (
            <div key={reply.id} className={classes["comment-p"]}>
              <DisplayComment comment={reply} setComments={props.setComments} commentIndex={props.commentIndex}/>
            </div>
          ))}
      </div>
    </>
  );
}
