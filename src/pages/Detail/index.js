import React, { useEffect, useState } from "react";

import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import DetailList from "components/List/DetailList";
import "./index.scss";
import { useHistory } from "react-router-dom";
import DetailCard from "components/Card/DetailCard";
import TransList from "components/List/TransList";
const Detail = ({ match, location }) => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const [currentBook, setCurrentBook] = useState([]);
  const { params } = match; //url params
  const [viewTrans, setViewTrans] = useState(false);
  const [viewReview, setViewReview] = useState(false);
  useEffect(() => {
    const findBook = async () => {
      const response = await api.get(`book/find/${params.isbn}`);
      setCurrentBook(response.data);
    };
    console.log("디테일페이지");
    findBook();
  }, []);
  console.log(currentBook);
  if (viewTrans) {
    return <TransList type="transcription" isbn={params.isbn} />;
  }
  return (
    <div className="detail">
      <DetailCard currentBook={currentBook} />
      <div className="detail__list">
        <div className="detail__list__trans">
          <DetailList type="transcription" isbn={params.isbn} />
        </div>
        <div className="detail__list__review">
          <DetailList type="review" isbn={params.isbn} />
        </div>
        <div className="detail__list__trans__button">
          <button onClick={() => setViewTrans(true)}>더보기</button>
          {currentUser.id !== 0 && (
            <button
              onClick={() =>
                history.push({
                  pathname: `/register/${params.isbn}`,
                  state: {
                    type: "transcription",
                  },
                })
              }
            >
              필사 작성
            </button>
          )}
        </div>
        <div className="detail__list__review__button">
          <button>더보기</button>
          {currentUser.id !== 0 && (
            <button
              onClick={() =>
                history.push({
                  pathname: `/register/${params.isbn}`,
                  state: {
                    type: "review",
                  },
                })
              }
            >
              리뷰 작성
            </button>
          )}
          </div>
      </div>
    </div>
  );
};

export default Detail;
