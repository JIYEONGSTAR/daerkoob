import React, { useState, useEffect } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
import { useHistory } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
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
  const { currentUser } = useCurrentUser();
  const [list, setList] = useState();
  const [size, setSize] = useState(0);
  const findList = async () => {
    const response = await api.get(
      `${type}/inquiry/${currentUser.id}/${isbn}/0`
    );
    setSize(response.data.totalSize);
    response.data.list && setList(response.data.list.splice(0, 5));
  };

  useEffect(() => {
    findList();
  }, []);
  if (size < 5) {
    if (list) {
      for (let i = size; i < 5; i++) {
        setList((pervState) => [
          ...pervState,
          { content: "", id: "", user: { nickName: "" } },
        ]);
        setSize((prev) => prev + 1);
      }
    }
  }
  return (
    <>
      <div className="detail__list__type">
        {type === "review" ? <h3>이 책의 리뷰 </h3> : <h3>이 책의 필사</h3>}
      </div>

      {size >= 5 && (
        <>
          <EachDetailList list={list} type={type} />
        </>
      )}
      <div className="detail__list__trans__button">
        {currentUser.id !== 0 && (
          <div
            className="detail__list__trans__button__more"
            onClick={() =>
              history.push({
                pathname: `/register/${isbn}`,
                state: {
                  type: `${type}`,
                },
              })
            }
          >
            <AiOutlineEdit size={16} />
            &nbsp;{type === "review" ? `리뷰` : `필사`} 작성
          </div>
        )}
        {size > 5 && (
          <div
            className="detail__list__trans__button__more"
            onClick={() => setView()}
          >
            <AiOutlineUnorderedList size={16} />
            &nbsp;더보기
          </div>
        )}
      </div>
    </>
  );
};

export default DetailList;
