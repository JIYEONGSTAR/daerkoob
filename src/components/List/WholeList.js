import React, { useState, useEffect } from "react";
import "./WholeList.scss";

import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";
import Pagination from "components/Utils/Pagination";
import EachTransList from "components/List/EachTransList";
import EachReviewList from "components/List/EachReviewList";
const WholeList = ({ isbn, type, onClose }) => {
  const { currentUser } = useCurrentUser();
  const [list, setList] = useState();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const findList = async () => {
    const response = await api.get(
      `${type}/inquiry/${currentUser.id}/${isbn}/${page}`
    );
    console.log(response);
    setTotalPage(response.data.totalSize);
    setList(response.data.list);
  };
  const handlePageChange = (num) => {
    setPage(num);
  };

  useEffect(() => {
    findList();
  }, [page]);
  if (!list) return <Loading />;
  return (
    <div className="wholeList">
      {/* {list.length === 0 && <>내용이없습니다</>} */}
      {type === "review" ? (
        <>
          <table className="wholeList__table">
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
      <Pagination setNumber={handlePageChange} total={totalPage} page={page} />
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default WholeList;
