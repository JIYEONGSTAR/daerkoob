import React, { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { useHistory } from "react-router-dom";
const EachReviewList = ({ each, isbn }) => {
  const history = useHistory();
  console.log(each);
  return (
    <>
      <tr
        onClick={() =>
          history.push({
            pathname: `/reviewDetail/${each.id}/`,
          })
        }
      >
        <td className="">{each.content}</td>
        <td className="">{each.user.nickName}</td>
        <td className="wholeList__tableDate">{each.registerDate.slice(0, 10)}</td>
        <td className="wholeList__tableDate">{each.score}</td>
        <td className="wholeList__tableDate">
          {each.thumbJudge ? <FaThumbsUp /> : <FaRegThumbsUp />}
          {each.thumbCount}개
        </td>
      </tr>
    </>
  );
};

export default EachReviewList;
