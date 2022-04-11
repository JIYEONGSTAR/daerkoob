import React from "react";
import "components/Card/DetailCard.scss";
const DetailCard = ({ currentBook }) => {
  return (
    <div className="detailCard">
      <div className="detailCard__img">
        <img src={currentBook.image} alt="" height="280" width="180" />
      </div>
      <div className="detailCard__text">
        <div className="detailCard__text__info">
          <div className="detailCard__text__info__title">{currentBook.title}</div>
          <div className="detailCard__text__info__author">{currentBook.author}</div>
          <div className="detailCard__text__info__publisher">{currentBook.publisher}</div>
          <div className="detailCard__text__info__pubdate">{currentBook.pubdate}</div>
        </div>
        <div className="detailCard__description">{currentBook.description}</div>
      </div>
    </div>
  );
};

export default DetailCard;
