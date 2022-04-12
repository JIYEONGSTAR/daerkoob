import React, { useState, useCallback, useEffect } from "react";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import CommentInputCard from "components/Card/CommentInputCard";
import NestedCommentCard from "components/Card/NestedCommentCard";
import Pagination from "components/Utils/Pagination";
const CommentCard = ({ data, update }) => {
  console.log(data);
  const { currentUser } = useCurrentUser();
  const [comment, setComment] = useState(""); //내가 쓰는 댓글
  const [commentAdd, setCommentAdd] = useState(""); //내가 쓰는 대댓글
  const [allComment, setAllComment] = useState([]); //전체 코멘트 리스트
  const [commentCount, setCommentCount] = useState(0); //전체 댓글 수
  const [paginationCommentCount, setPaginationCommentCount] = useState(0); //페이지네이션을 위한 댓글 수
  const [page, setPage] = useState(0); //페이지네이션을 위한 페이지번호

  const handleChange = (e) => {
    setComment(e.target.value);
    //바로바로 새로고침
  };
  const handlePageChange = (num) => {
    console.log(num, "num");
    setPage(num);
  };

  const handleSubmit = async () => {
    //저장
    const response = await api.post("comment/register/review", null, {
      params: {
        userId: currentUser.id,
        reviewId: data.id,
        content: comment,
      },
    });
    setComment("");
    update();
    alert(response.data.message);
  };
  const getComment = async () => {
    //댓글 불러오기
    const response = await api.get(
      `comment/inquiry/${data.id}/${currentUser.id}/${page}`
    );
    console.log("댓글불러오기");
    console.log(response);
    setAllComment(response.data.list);
    setCommentCount(response.data.totalSize);
    setPaginationCommentCount(response.data.realSize);
  };

  useEffect(() => {
    getComment();
  }, [page, data]);

  return (
    <div>
      <h2>전체 댓글 개수:{commentCount}</h2>
      <CommentInputCard
        // 댓글쓰는input
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        // handleKeyPress={handleKeyPress}
      />
      {allComment.map((d) => (
        <NestedCommentCard
          data={d}
          setCommentAdd={setCommentAdd}
          update={update}
        />
      ))}
      <Pagination
        setNumber={handlePageChange}
        total={paginationCommentCount}
        page={page}
      />
    </div>
  );
};

export default CommentCard;
