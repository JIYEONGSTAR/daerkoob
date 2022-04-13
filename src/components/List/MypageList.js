import React from "react";
import EachTransList from "components/List/EachTransList";
import EachReviewList from "components/List/EachReviewList";
const MypageList = ({ list, type, onClose }) => {
  console.log(list);

  return (
    <div className="mypageList">
      {type}
      <button onClick={onClose}>닫기</button>
      {type === "review" ? (
        <>
          <table>
            <tr>
              <th>내용</th>
              <th>쓴 사람</th>
              <th>쓴 날짜</th>
              <th>별점</th>
              <th>좋아요 수</th>
            </tr>
            {list.map((each) => (
              <EachReviewList each={each} />
            ))}
          </table>
        </>
      ) : (
        <>
          <table>
            <tr>
              <th>내용</th>
              <th>쓴 사람</th>
              <th>쓴 날짜</th>
              <th>좋아요 수</th>
            </tr>
            {list.map((each) => (
              <EachTransList each={each} />
            ))}
          </table>
        </>
      )}
    </div>
  );
};

export default MypageList;
