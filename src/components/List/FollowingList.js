import React from "react";
import api from "api/api";
import { useHistory } from "react-router-dom";
import useCurrentUser from "Hooks/useCurrentUser";
const FollowingList = ({ list, onClose }) => {
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
    console.log(response);
    response.data.message.flag &&
      history.push({
        pathname: `/friendPage/${response.data.list[0].id}`,
        state: {
          personInfo: response.data.list[0],
        },
      });
  };
  return (
    <div>
      <button onClick={onClose}>닫기</button>
      {list.map((each) => (
        <div>
          {console.log(each)}
          <span onClick={() => clickFriend(each.friendNickName)}>
            {each.friendNickName}
          </span>
          {/* <span>{each.friendIndex}</span> */}
        </div>
      ))}
    </div>
  );
};

export default FollowingList;
