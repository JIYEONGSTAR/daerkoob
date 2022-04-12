import React, { useState, useEffect } from "react";

import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import ReactStars from "react-stars"; //별점매기기
import "./index.scss";
import DetailCard from "components/Card/DetailCard";
import { useHistory } from "react-router-dom";
const Register = ({ isbn, location, match }) => {
  const history = useHistory();
  const type = location.state.type;
  const { params } = match;
  const [currentBook, setCurrentBook] = useState();
  const [content, setContent] = useState("");
  const { currentUser } = useCurrentUser();
  const [score, setScore] = useState(0);
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const ratingChanged = (newRating) => {
    setScore(newRating);
    console.log(score);
  };
  // const type =
  const handleSubmit = async () => {
    const response = await api.post(`${type}/register`, null, {
      params: {
        userId: currentUser.id,
        isbn: params.isbn,
        content: content,
        score: score,
      },
    });

    if (response.data) {
      alert("저장했습니다.");
      history.push(`/detail/${params.isbn}`);
      // onClose();
    }
  };
  const handleKeyPress = (e) => {
    //엔터키로 입력하기
    // console.log("enter", e);
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    const findBook = async () => {
      const response = await api.get(`book/find/${params.isbn}`);
      setCurrentBook(response.data);
    };
    findBook();
  }, []);
  return (
    <div className="register">
      {currentBook && (
        <>
          {type}
          <DetailCard currentBook={currentBook} />
          <textarea
            // className="bookDatail__input"
            cols="40"
            rows="10"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          ></textarea>
          <div>
            {type === "review" && (
              <ReactStars
                className="starRating"
                count={5}
                onClick={ratingChanged}
                onChange={ratingChanged}
                size={40}
                color2={"#ffd700"}
              />
            )}
            <button onClick={handleSubmit}>저장</button>
            &nbsp;&nbsp;&nbsp;
            <button
              onClick={() => {
                history.goBack();
              }}
            >
              뒤로가기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
