import React, { useState, useEffect } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
import { useHistory } from "react-router-dom";
import {AiOutlineUnorderedList} from "react-icons/ai";
import {AiOutlineEdit} from "react-icons/ai";
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
                ? each.id &&
                  history.push({
                    pathname: `/reviewDetail/${each.id}/`,
                  })
                : each.id &&
                  history.push({
                    pathname: `/transDetail/${each.id}/`,
                  });
            }}
          >
            {console.log(each)}
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
  const history = useHistory();
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
  if (size < 5) {
    if (list) {
      console.log(list);
      for (let i = size; i < 5; i++) {
        console.log(i, "플러스해야함");
        console.log(list);
        // let newList = [
        //   ...list,
        //   { content: "없어요", user: { nickName: "없어" } },
        // ];
        // console.log(newList);
        setList((pervState) => [
          ...pervState,
          { content: "", id: "", user: { nickName: "" } },
        ]);
        console.log(list);
        setSize((prev) => prev + 1);
        // console.log([...list]);
      }
    }
  }
  // findList(); //화면 들어올 때 마다 새로고침
  // console.log(list.length);
  // console.log(list.length > 5);
  return (
    <>
      <div className="detail__list__type">
        {type === "review" ? <h3>이 책의 리뷰 </h3> : <h3>이 책의 필사</h3>}
      </div>

      {size >= 5 && (
        <>
          {console.log(list)}
          <EachDetailList list={list} type={type} />
        </>
      )}
      {/* {size === 0 ? (
        <div className="detail__list__type__empty">내용이 없습니다</div>
      ) : (
        <>
          {console.log(size)}
          {console.log(list)}
          <EachDetailList list={list} type={type} />
        </>
      )} */}
      <div className="detail__list__trans__button">
        {/* <div className="detail__list__review__button"> */}
        {currentUser.id !== 0 && (
          <div
            className="detail__list__trans__button__more">
            <AiOutlineEdit
            size={16}
            onClick={() =>
              history.push({
                pathname: `/register/${isbn}`,
                state: {
                  type: `${type}`,
                },
              })
            }/>
            &nbsp;{type === "review" ? `리뷰` : `필사`} 작성
          </div>
        )}
        {size > 5 &&<div className="detail__list__trans__button__more"><AiOutlineUnorderedList size={16} onClick={() => setView()}/>&nbsp;더보기</div>}
      </div>
    </>
  );
};

export default DetailList;
