import React, { useState, useEffect, Suspense, laz } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
const EachDetailList = ({ list }) => {
  if (!list) return <Loading />;
  return (
    <>
      {list.length === 0 ? (
        <div>내용이 없습니다</div>
      ) : (
        <>
          {list.map((each) => (
            <div className="detail__list__one">
              <span className="detail__list__one__title">{each.content}</span>
              <span className="detail__list__one__nickName">
                {each.user.nickName}
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};
const DetailList = ({ type, isbn }) => {
  const { currentUser } = useCurrentUser();
  const [list, setList] = useState();
  const findList = async () => {
    const response = await api.get(
      `${type}/inquiry/${currentUser.id}/${isbn}/0`
    );
    setList(response.data.list);
  };
  useEffect(() => {
    findList();
    console.log("페이지 들어옴");
  }, []);
  findList(); //화면 들어올 때 마다 새로고침
  return (
    <>
      <div className="detail__list__type">
        {type === "review" ? <h3>리뷰 </h3> : <h3>필사</h3>}
      </div>
      <EachDetailList list={list} />
    </>
  );
};

export default DetailList;
