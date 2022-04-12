import React, { useState, useEffect } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
import { useHistory } from "react-router-dom";
const EachDetailList = ({ list, type }) => {
  const history = useHistory();
  if (!list) return <Loading />;

  return (
    <>
      <>
        {list.map((each) => (
          <div
            className="detail__list__one"
            onClick={() => {
              type === "review"
                ? history.push({
                    pathname: `/reviewDetail/${each.id}/`,
                    // state: {
                    //   data: each,
                    // },
                    //안넣어도 됨
                  })
                : history.push({
                    pathname: `/transDetail/${each.id}/`,
                    // state: {
                    //   data: each,
                    // },
                    //안넣어도 됨
                  });
            }}
          >
            <span className="detail__list__one__title">{each.content}</span>
            <span className="detail__list__one__nickName">
              {each.user.nickName}
            </span>
          </div>
        ))}
      </>
    </>
  );
};
const DetailList = ({ type, isbn, setView }) => {
  console.log(setView);
  const { currentUser } = useCurrentUser();
  const [list, setList] = useState();
  const [size, setSize] = useState(0);
  const findList = async () => {
    const response = await api.get(
      `${type}/inquiry/${currentUser.id}/${isbn}/0`
    );
    console.log(response);
    setSize(response.data.totalSize);
    // console.log(size);
    response.data.list && setList(response.data.list.splice(0, 5));
  };
  useEffect(() => {
    findList();
    console.log("페이지 들어옴");
  }, []);
  // findList(); //화면 들어올 때 마다 새로고침
  // console.log(list.length);
  // console.log(list.length > 5);
  return (
    <>
      <div className="detail__list__type">
        {type === "review" ? <>리뷰 </> : <>필사</>}
      </div>
      {size === 0 ? (
        <div>내용이 없습니다</div>
      ) : (
        <EachDetailList list={list} type={type} />
      )}

      {size > 5 && <button onClick={() => setView()}>더보기</button>}
    </>
  );
};

export default DetailList;
