//게시글 카드
import React from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";
import { useHistory } from "react-router-dom";
import "./BulletinCard.scss";
import ReactStars from "react-stars"; //별점매기기

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
          <div className="bulletinCard__header__explain">
            이 책을 읽은 <strong>{data.user.nickName}</strong>님의{" "}
            {type === "review" ? "리뷰" : "필사"}
          </div>
          <div className="bulletinCard__header__timestamp">
            {data.registerDate.split("T").join(" ")}에 작성됨
          </div>
        </div>
        <div className="bulletinCard__body">
          {type === "review" && (
            <div className="bulletinCard__body__rating">
              <h3>{data.user.nickName}님이 준 별점</h3>
              {data.score && (
                <ReactStars value={data.score} size={30} edit={false} />
              )}
            </div>
          )}
          <div className="bulletinCard__body__text">{data.content}</div>
          <div className="bulletinCard__body__like">
            <div>이 게시물을 추천하기</div>
            <button
              onClick={() => handleThumb(data)}
              style={{ cursor: "pointer" }}
            >
              {data.thumbJudge ? <FaThumbsUp /> : <FaRegThumbsUp />}
              &nbsp;
              {data.thumbCount}
            </button>
          </div>
          <div className="bulletinCard__body__button">
            {data.user.id === currentUser.id && (
              <button onClick={() => deleteContext(data)}>삭제</button>
            )}
            <button
              onClick={() => {
                history.goBack();
              }}
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default BulletinCard;
