"use client";
import { useState, useEffect } from "react";
import classes from "./comments.module.css";
import DisplayComment from "./display-comment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
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
      setComment("");
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
      <Container>
        <Row>
          <Col xs={12} sm={11} className="mx-sm-auto">
            <Card>
              <Card.Header>
                <i className="bi bi-chat-right-text-fill ms-2"></i>
                هر سوالی دارید در اینجا وارد کنید
              </Card.Header>
              <Card.Body>
                <Form action="" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>متن سوال یا دیدگاه</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(event) => setComment(event.target.value)}
                      placeholder=""
                      className=""
                      value={comment}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex justify-content-center mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="d-flex justify-content-center"
                    >
                      ارسال
                    </Button>
                  </Form.Group>
                  {comments &&
                    comments.map((comment, index) => (
                      <DisplayComment
                        key={comment.id}
                        comment={comment}
                        setComments={setComments}
                        commentIndex={index}
                      />
                    ))}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setComment(event.target.value)}
          placeholder="Enter Comment"
          className={classes["input-align"]}
          value={comment}
        />
        <button className={classes["comment-btn"]}>create comment</button>
        {comments &&
          comments.map((comment, index) => (
            <DisplayComment
              key={comment.id}
              comment={comment}
              setComments={setComments}
              commentIndex={index}
            />
          ))}
      </form> */}
    </>
  );
}
