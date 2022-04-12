import React from "react";

const CommentInputCard = ({
  comment,
  handleChange,
  handleSubmit,
  // handleKeyPress,
}) => {
  const handleKeyPress = (e) => {
    //엔터키로 입력하기
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="addComment">
      <input
        required
        className="addComment__input"
        type="text"
        value={comment}
        // onkeyPress={handleKeyPress}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        placeholder="댓글추가"
      ></input>
      <button onClick={handleSubmit} className="addComment__submit">
        저장
      </button>
      <span className="addComment__line" />
    </div>
  );
};

export default CommentInputCard;
