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
    findBook();
  }, []);
  if (viewTrans) {
    return (
      <div className="detail">
        <div className="detail__wrapper">
          <DetailCard currentBook={currentBook} />
          <div style={{ marginTop: "16px" }} />
          <WholeList
            type="transcription"
            isbn={params.isbn}
            onClose={() => setViewTrans(false)}
          />
        </div>
      </div>
    );
  }
  if (viewReview) {
    return (
      <div className="detail">
        <div className="detail__wrapper">
          <DetailCard currentBook={currentBook} />
          <div style={{ marginTop: "16px" }} />
          <WholeList
            type="review"
            isbn={params.isbn}
            onClose={() => setViewReview(false)}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="detail">
      <div className="detail__wrapper">
        <div style={{ marginTop: "16px" }} />
        <DetailCard currentBook={currentBook} />
        <div className="detail__list">
          <div className="detail__list__trans">
            <DetailList
              type="transcription"
              isbn={params.isbn}
              setView={() => setViewTrans(true)}
            />
          </div>

          <div className="detail__list__review">
            <DetailList
              type="review"
              isbn={params.isbn}
              setView={() => setViewReview(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
