"use client";
import { useState, useEffect } from "react";
import classes from "./comments.module.css";
import DisplayComment from "./display-comment";
export default function Comments() {
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await postComments();
    } catch (error) {
      console.log(error);
    }
    async function postComments() {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const fetchedResponse = await fetch("/api/comments");
      const fetchedComments = await fetchedResponse.json();
    
      setComments(fetchedComments);
    }
  }
  useEffect(() => {
    async function fetchAllComments() {
      const fetchedResponse = await fetch("/api/comments");
      const fetchedComments = await fetchedResponse.json();
      setComments(fetchedComments);
    }
    fetchAllComments();
  }, []);
  console.log("comments", comments);
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setComment(event.target.value)}
          placeholder="Enter Comment"
          className={classes["input-align"]}
        />
        <button className={classes["comment-btn"]}>create comment</button>
        {comments && comments.map((comment, index) => (
            <DisplayComment key={comment.id} comment={comment} setComments={setComments}/>
        ))}
      </form>
    </>
  );
}
