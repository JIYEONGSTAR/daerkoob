import React from "react";
import api from "api/api";
import { useHistory } from "react-router-dom";
import useCurrentUser from "Hooks/useCurrentUser";
const EachFollowing = ({ following, onClose }) => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  const clickFriend = async (nickName) => {
    const response = await api.post("user/find", null, {
      params: {
        userId: currentUser.id,
        nickName: nickName,
      },
    });
    onClose();
    alert(response.data.message.message);
    response.data.message.flag &&
      history.push({
        pathname: `/friendPage/${response.data.list[0].id}`,
        state: {
          personInfo: response.data.list[0],
        },
      });
  };
  return (
    <div
      className="followingLine"
      onClick={() => clickFriend(following.friendNickName)}
    >
      <div className="followingLine__nickName"> {following.friendNickName}</div>
    </div>
  );
};
const FollowingList = ({ list, onClose, nickName }) => {
  return (
    <>
      <div className="followingList">
        <div className="followingList__header">
          <h2>{nickName}의 팔로잉목록</h2>
        </div>
        {list.map((each) => (
          <EachFollowing following={each} onClose={onClose} />
        ))}
      </div>
      <div className="followingButton">
        <button onClick={onClose}>닫기</button>
      </div>
    </>
  );
};

export default FollowingList;
