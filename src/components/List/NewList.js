import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useHistory } from "react-router-dom";
const NewList = ({ data, title, type }) => {
  const history = useHistory();
  return (
    <div
      className="home__newList__line__one"
      onClick={() => {
        type === "review"
          ? history.push({
              pathname: `/reviewDetail/${data.id}/`,
            })
          : history.push({
              pathname: `/transDetail/${data.id}/`,
            });
      }}
    >
      {title && title}
      <span className="home__newList__line__one__title">{data.book.title}</span>
      <span className="home__newList__line__one__nickName">
        {data.user.nickName}
      </span>
    </div>
  );
};

export default NewList;
