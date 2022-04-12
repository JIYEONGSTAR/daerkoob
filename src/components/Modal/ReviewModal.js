import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import "./ReviewModal.scss";
import CommentInputCard from "components/Card/CommentInputCard";
import { FaThumbsUp, FaRegThumbsUp, FaCaretDown } from "react-icons/fa";
import Pagination from "components/Utils/Pagination";
const ReviewCommnetModal = ({ data, setCommentAdd, onThumb }) => {
  const { currentUser } = useCurrentUser();
  const d = data;
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentRegister, setCommentRegister] = useState(false);
  const handleCommentsOpen = () => {
    setCommentsOpen(!commentsOpen);
  };
  const [nestedComment, setNestedComment] = useState("");
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
    setCommentRegister(false);

    // handleNestedComment();
  };
  const handleThumb = async (d) => {
    const response = await api.post("thumb/comment", null, {
      params: {
        userIndex: currentUser.id,
        commentId: d.id,
      },
    });
    onThumb();
    alert(response.data.message);
  };
  return (
    <div className="re-comment">
      <h4>{d.writer.nickName}</h4>
      {d.content}
      <div>
        <button onClick={() => handleThumb(d)}>
          {d.thumbJudge ? <FaThumbsUp /> : <FaRegThumbsUp />}:{d.thumbCount}
        </button>

        <button onClick={() => setCommentRegister(!commentRegister)}>
          <pre> &#09;댓글달기</pre>
        </button>
      </div>
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

const ReviewModal = ({ data, isOpen, close }) => {
  const { currentUser } = useCurrentUser();
  const [comment, setComment] = useState("");
  // const [nestedComment, setNestedComment] = useState("");
  const [commentAdd, setCommentAdd] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [paginationCommentCount, setPaginationCommentCount] = useState(0);
  const [page, setPage] = useState(0);
  const getReview = useCallback(async () => {
    const response = await api.get(
      `comment/inquiry/${data.id}/${currentUser.id}/${page}`
    );
    console.log(response);
    setAllComment(response.data.list);
    setCommentCount(response.data.totalSize);
    setPaginationCommentCount(response.data.realSize);
  }, [page]);
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  // const handleNestedComment = () => {
  //   setCommentAdd(true);
  // };
  const handleSubmit = async () => {
    const response = await api.post("comment/register/review", null, {
      params: {
        userId: currentUser.id,
        reviewId: data.id,
        content: comment,
      },
    });
    setComment("");
    alert(response.data.message);
  };
  const handlePageChange = (num) => {
    console.log(num, "num");
    setPage(num);
  };

  useEffect(() => {
    getReview();
  }, [comment, commentAdd, getReview]);
  const handleThumb = () => {
    getReview();
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    content: {
      width: "100%",
      height: "90vh",
      position: "absolute",
      top: "50%",
      left: " 50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #eee",
      borderRadius: "15px",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      outline: "none",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "gray",
      marginTop: "70px",
    },
  };
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  // console.log("reviewModal")
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="modal">
        <button onClick={close} className="closeBtn">
          댓글 닫기
        </button>
        {data.book.title}
        <h2>전체 댓글 개수:{commentCount}</h2>
        <CommentInputCard
          // 댓글쓰는input
          comment={comment}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          // handleKeyPress={handleKeyPress}
        />

        {allComment.map((d) => (
          <ReviewCommnetModal
            // 댓글 나오는 모달
            data={d}
            setCommentAdd={setCommentAdd}
            onThumb={handleThumb}
          />
        ))}
      </div>
      <Pagination
        setNumber={handlePageChange}
        total={paginationCommentCount}
        page={page}
      />
    </Modal>
  );
};

export default ReviewModal;
