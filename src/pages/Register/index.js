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
    let isSubmit = window.confirm("저장하시겠습니까?");
    if (isSubmit) {
      const response = await api.post(`${type}/register`, null, {
        params: {
          userId: currentUser.id,
          isbn: params.isbn,
          content: content,
          score: score,
        },
      });
      console.log(response);
      if (response.data.flag) {
        alert("저장했습니다.");
        history.push(`/detail/${params.isbn}`);
        // onClose();
      } else {
        alert(response.data.message);
      }
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
          {type === "review" ? (
              <div className="register__type">
                <h2>리뷰하기</h2>
              </div>
            )
            :
            (
              <div className="register__type">
                <h2>필사하기</h2>
              </div>
            )}
          <DetailCard currentBook={currentBook} />
          <div className="register__input">
            {type === "review" && (
              <div className="register__input__rating">
                <h3>이 책 평가하기</h3>
                <ReactStars
                  className="starRating"
                  count={5}
                  onClick={ratingChanged}
                  onChange={ratingChanged}
                  size={30}
                  color2={"#ffd700"}
                  value={score}
                />
              </div>
            )}
            <textarea
              className="register__input__area"
              cols="80"
              rows="25"
              minlength="1"
              maxlength="10000"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="register__button">
            <button
              onClick={() => {
                history.goBack();
              }}
            >
              뒤로가기
            </button>
            <button onClick={handleSubmit}>저장</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
