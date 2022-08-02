import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "Soo",
        comment: "Hello, this is Soo.",
    },
    {
        name: "Ddoo",
        comment: "React is so cool!",
    },
    {
        name: "Emily",
        comment: "I love React.js.",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    )
}

export default CommentList;