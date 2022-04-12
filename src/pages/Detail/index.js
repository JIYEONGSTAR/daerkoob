import React, { useEffect, useState } from "react";

import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import DetailList from "components/List/DetailList";
import "./index.scss";
import { useHistory } from "react-router-dom";
import DetailCard from "components/Card/DetailCard";
import WholeList from "components/List/WholeList";
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
    return (
      <WholeList
        type="transcription"
        isbn={params.isbn}
        onClose={() => setViewTrans(false)}
      />
    );
  }
  if (viewReview) {
    return (
      <WholeList
        type="review"
        isbn={params.isbn}
        onClose={() => setViewReview(false)}
      />
    );
  }
  return (
    <div className="detail">
      <DetailCard currentBook={currentBook} />
      <div className="detail__list">
        <div className="detail__list__trans">
          <DetailList
            type="transcription"
            isbn={params.isbn}
            setView={() => setViewTrans(true)}
          />

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
              필사작성하러가기
            </button>
          )}
        </div>
        <div className="detail__list__review">
          <DetailList
            type="review"
            isbn={params.isbn}
            setView={() => setViewReview(true)}
          />

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
              리뷰작성하러가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
