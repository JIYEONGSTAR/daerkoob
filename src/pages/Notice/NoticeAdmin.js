import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "api/api";
import "./NoticeAdmin.scss";
const NoticeAdmin = () => {
  const history = useHistory();
  const [register, setRegister] = useState({
    title: "",
    content: "",
  });
  const handleChange = (e) => {
    const {
      target: { value, id },
    } = e;
    setRegister({ ...register, [id]: value });
  };
  const handleSubmit = async () => {
    const response = await api.post(`notice/register`, null, {
      params: {
        title: register.title,
        content: register.content,
      },
    });
    history.push("/notice");
  };
  return (
    <div className="noticeInput">
      <div className="noticeInput__wrapper">
        <div className="noticeInput__header">
          <h2>공지사항 작성하기</h2>
        </div>
        <div className="noticeInput__inputArea">
          <textarea
            className="noticeInput__inputArea__title"
            id="title"
            value={register.title}
            cols="30"
            rows="1"
            minlength="1"
            maxlength="50"
            onChange={handleChange}
            placeholder="제목을 작성하세요"
          ></textarea>
          <textarea
            className="noticeInput__inputArea__text"
            id="content"
            value={register.content}
            cols="80"
            rows="25"
            minlength="1"
            maxlength="10000"
            onChange={handleChange}
            placeholder="내용을 작성하세요"
          ></textarea>
        </div>
        <div className="noticeInput__button">
          <button
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
          <button onClick={handleSubmit}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default NoticeAdmin;
