//대댓글 컴포넌트
import React, { useState } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import CommentInputCard from "./CommentInputCard";
import api from "api/api";
import { FaThumbsUp, FaRegThumbsUp, FaCaretDown } from "react-icons/fa";
const NestedCommentCard = ({ data, setCommentAdd, update }) => {
  // console.log("nestedComment", data);
  const d = data;
  const { currentUser } = useCurrentUser();
  const [nestedComment, setNestedComment] = useState(""); //대댓글
  const [commentRegister, setCommentRegister] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const handleCommentsOpen = () => {
    setCommentsOpen(!commentsOpen);
  };
  const handleChange = (e) => {
    setNestedComment(e.target.value);
  };
  const handleSubmit = async () => {
    const response = await api.post("comment/register/nested", null, {
      params: {
        userId: currentUser.id,
        commentId: d.id,
        content: nestedComment,
      },
    });
    setCommentAdd(nestedComment);
    setNestedComment("");
    update();
    setCommentRegister(false);
  };
  return (
    <div>
      <h4>{d.writer.nickName}</h4>
      {d.content}
      <button onClick={() => setCommentRegister(!commentRegister)}>
        <pre> &#09;댓글달기</pre>
      </button>
      {commentRegister && (
        <CommentInputCard
          comment={nestedComment}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          // handleKeyPress={handleKeyPress}
        />
      )}
      {d.nestedCount > 0 && (
        <div>
          <FaCaretDown onClick={handleCommentsOpen} />
          <span>답글 {d.nestedCount}개 보기</span>
        </div>
      )}
      {commentsOpen && d.comments && (
        <>
          {d.comments.map((c) => (
            <div> &#45; {c.content}</div>
          ))}
          <div></div>
        </>
      )}
    </div>
  );
};

export default NestedCommentCard;
