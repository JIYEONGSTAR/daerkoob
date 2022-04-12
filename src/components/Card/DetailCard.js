import React from "react";
import "components/Card/DetailCard.scss";

const DetailCard = ({ currentBook }) => {
  function convertStringToDate(dateString) {
    if (!dateString) {
      console.log("Loading...");
    } else {
      return dateString.replace(
        /^(\d{4})(\d{2})(\d{2})/g,
        function (fullString, year, month, day) {
          return year + "." + month + "." + day;
        }
      );
    }
  }
  return (
    <div className="detailCard">
      <div className="detailCard__img">
        <img src={currentBook.image} alt="" height="280" width="180" />
      </div>
      <div className="detailCard__text">
        <div className="detailCard__text__info">
          <div className="detailCard__text__info__title">
            {currentBook.title}
          </div>
          <div className="detailCard__text__info__author">
            {currentBook.author}
          </div>
          <div className="detailCard__text__info__publisher">
            {currentBook.publisher}
          </div>
          <div className="detailCard__text__info__pubdate">
            {convertStringToDate(currentBook.pubdate)}
          </div>
        </div>
        <div className="detailCard__description">{currentBook.description}</div>
      </div>
    </div>
  );
};

export default DetailCard;
