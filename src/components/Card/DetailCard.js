import React from "react";
import "components/Card/DetailCard.scss";
const DetailCard = ({ currentBook }) => {
  console.log(currentBook);
  return (
    <div className="detailCard">
      <div className="detailCard__img">
        <img src={currentBook.image} alt="" height="280" width="180" />
      </div>
      <div className="detailCard__text">
        <div>{currentBook.title}</div>
        <div>{currentBook.author}</div>
        <div>{currentBook.publisher}</div>
        <div>{currentBook.pubdate}</div>
        <div className="detailCard__description">{currentBook.description}</div>
      </div>
    </div>
  );
};

export default DetailCard;
