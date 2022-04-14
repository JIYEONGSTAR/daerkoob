import React from "react";
import EachTransList from "components/List/EachTransList";
import EachReviewList from "components/List/EachReviewList";

const MypageList = ({ list, type, onClose }) => {
  console.log(list);

  return (
    <>
    <div style={{marginTop:"16px"}}/>

    <div className="wholeList">
    {type === "review" ? (
      <>
        <table className="wholeList__table">
          <thead>
            <tr>
              <th className="wholeList__table__context">내용</th>
              <th className="wholeList__table__author">게시자</th>
              <th className="wholeList__table__date">게시일</th>
              <th className="wholeList__table__rating">별점</th>
              <th className="wholeList__table__like">좋아요</th>
            </tr>
          </thead>
          <tbody>
            {list.map((each) => (
              <EachReviewList each={each} />
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <>
        <table className="wholeList__table">
          <thead>
            <tr>
              <th className="wholeList__table__context">내용</th>
              <th className="wholeList__table__author">게시자</th>
              <th>게시일</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {list.map((each) => (
              <EachTransList each={each} />
            ))}
          </tbody>
        </table>
      </>
    )}
    
    <div className="wholeList__buttonArea">
      <button onClick={onClose}>닫기</button>
    </div>
  </div>
  </>
  );
};

export default MypageList;
