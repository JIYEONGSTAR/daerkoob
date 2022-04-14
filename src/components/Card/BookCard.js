import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "components/Card/BookCard.scss";
import useCurrentUser from "Hooks/useCurrentUser";
import { AiFillCheckCircle } from "react-icons/ai";
//import BookDetail from "components/Card/BookDetail";
//import useContents from "Hooks/useContents";
// import { currentContent } from 'Store';
import api from "api/api";

const BookCard = ({ data }) => {
  const img_link =
    "https://resource.grapplet.com/marketplace/7176/1591667231081/i.svg.preview.580x870.png";
  const { title, image, isbn } = data;

  const [transCount, setTransCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      const response1 = await api.get(`transcription/judge/${isbn}`);
      const response2 = await api.get(`review/judge/${isbn}`);
      setTransCount(response1.data.totalSize);
      setReviewCount(response2.data.totalSize);
    };
    init();
  }, []);
  const handleClick = () => {
    history.push(`/detail/${isbn}`);
  };
  return (
    <div className="bookCard" onClick={handleClick}>
      <div className="bookCard__context">
        <div className="bookCard__image">
          <img src={image ? image : img_link} alt="" height="140" width="90" className="bookCard__img" />
        </div>
        <div className="bookCard__title">
          {title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
        </div>
        <div className="bookCard__info">
          <div className="bookCard__info__trans">필사 {transCount}개</div>
          <div className="bookCard__info__review">리뷰 {reviewCount}개</div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
