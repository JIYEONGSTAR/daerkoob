//게시글 카드
import React from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";
import { useHistory } from "react-router-dom";
import "./BulletinCard.scss";

const BulletinCard = ({ data, type, onThumb }) => {
  //  //console.log("bulletinCard", type, d);
  const history = useHistory();
  //console.log(data);
  // const user = data.user;
  const { currentUser } = useCurrentUser();
  // const data = d[0];
  // const data = d[0];
  //  //console.log("d.list[0]", d.list);
  // const data = null;
  const handleThumb = async (d) => {
    type === "review"
      ? await api.post(`thumb/${type}`, null, {
          params: {
            userIndex: currentUser.id,
            reviewId: d.id,
          },
        })
      : await api.post(`thumb/${type}`, null, {
          params: {
            userIndex: currentUser.id,
            transcriptionId: d.id,
          },
        });
    onThumb();
  };
  const deleteContext = async (d) => {
    //console.log(d);
    //console.log(typeof d.id);
    type === "review"
      ? await api.post(`${type}/delete`, null, {
          params: {
            reviewId: d.id,
            userId: currentUser.id,
          },
        })
      : await api.post(`${type}/delete`, null, {
          params: {
            transcriptionId: d.id,
            userId: currentUser.id,
          },
        });
    alert("삭제되었습니다");
    history.goBack();
  };
  if (!data.user) {
    return <Loading />;
  }
  if (data) {
    //console.log(data);
    return (
      <div className="bulletinCard">
        <div className="bulletinCard__header">
          <div className="bulletinCard__header__img">
            <img src={data.book.image} alt="" height="280" width="180"></img>
          </div>
          <div className="bulletinCard__header__title">{data.book.title}</div>
          <div>이 책을 읽은 <strong>{data.user.nickName}</strong>님의 {type==="review" ? "리뷰" : "필사"}</div>
        </div>
        <div className="bulletinCard__body">
          <div>글내용:{data.content}</div>
          {/* 이거 쓰고 싶은데 안된다... 왜 안될까 */}
          <div>{data.registerDate}</div>
          {type==="review"&&<div>{data.score && data.score}</div>}
          <div>좋아요 수:{data.thumbCount}</div>

          <div>
            <button
              onClick={() => handleThumb(data)}
              style={{ cursor: "pointer" }}
            >
              {data.thumbJudge ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </button>
          </div>
          {data.user.id === currentUser.id && (
            <button onClick={() => deleteContext(data)}>삭제</button>
          )}
        </div>
      </div>
    );
  }
};

export default BulletinCard;
