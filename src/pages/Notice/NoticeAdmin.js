// // import React, { useState } from "react";
// // import Pagination from "components/Utils/Pagination";
// // import NoticeList from "components/List/NoticeList";
// // import api from "api/api";
// // const NoticeAdmin = () => {
// //   const [noticeList, setNoticeList] = useState([]);
// //   return (
// //     <div className="registerNotice">
// //       <NoticeList data={noticeList} />
// //       <Pagination setNumber={handlePageChange} total={totalPage} page={page} />
// //     </div>
// //   );
// // };

// // export default NoticeAdmin;
// //어드민 노티스 만들기
// import React from "react";

// const NoticeAdmin = () => {
//   return (
//     <div>
//       <textarea
//         // className="bookDatail__input"
//         cols="40"
//         rows="10"
//         onChange={handleChange}
//         onKeyPress={handleKeyPress}
//       ></textarea>
//       <textarea
//         // className="bookDatail__input"
//         cols="40"
//         rows="10"
//         onChange={handleChange}
//         onKeyPress={handleKeyPress}
//       ></textarea>
//     </div>
//   );
// };

// export default NoticeAdmin;
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
    console.log("id", id, "value", value);
    setRegister({ ...register, [id]: value });
  };
  const handleSubmit = async () => {
    const response = await api.post(`notice/register`, null, {
      params: {
        title: register.title,
        content: register.content,
      },
    });
    console.log(response);
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
