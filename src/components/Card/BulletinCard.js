//게시글 카드

import React from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";

const BulletinCard = ({ data, type, onThumb }) => {
  // console.log("bulletinCard", type, d);
  console.log(data);
  // const user = data.user;
  const { currentUser } = useCurrentUser();
  // const data = d[0];
  // const data = d[0];
  // console.log("d.list[0]", d.list);
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
    type === "review"
      ? await api.delete(`${type}/delete`, null, {
          params: {
            reviewId: d.id,
            userId: currentUser.id,
          },
        })
      : await api.delete(`${type}/delete`, null, {
          params: {
            transcriptionId: d.id,
            userId: currentUser.id,
          },
        });
    alert("삭제되었습니다");
  };
  if (!data.user) {
    return <Loading />;
  }
  if (data) {
    console.log(data);
    return (
      <div>
        <div>글내용:{data.content}</div>
        <div>글 쓴 사람:{data.user.nickName}</div>
        {/* 이거 쓰고 싶은데 안된다... 왜 안될까 */}

        <div>쓰여진 날짜{data.registerDate}</div>
        <div>글 쓴 사람이 준 별점:{data.score && data.score}</div>
        <div>좋아요 수:{data.thumbCount}</div>

        <div>
          내가 이 글에 대해 좋아요를 눌렀는지?
          <button
            onClick={() => handleThumb(data)}
            style={{ cursor: "pointer" }}
          >
            {data.thumbJudge ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </button>
        </div>
        {data.user.id === currentUser.id && (
          <button onClick={deleteContext}>내가 작성했다 삭제할거다</button>
        )}
      </div>
    );
  }
};

export default BulletinCard;
