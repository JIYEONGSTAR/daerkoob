import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import { FaSearch } from "react-icons/fa";
import MypageFriendsModal from "components/Modal/MypageFriendsModal";
import MypageReviewModal from "components/Modal/MypageReviewModal";
import MypageTransModal from "components/Modal/MypageTransModal";
import "components/Card/InfoCard.scss";
const InfoCard = ({ personInfo, id }) => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const [MyTransList, setMyTransList] = useState([]);
  const [MyReviewList, setMyReviewList] = useState([]);
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [transModalOpen, setTransModalOpen] = useState(false);
  const [searchFriend, setSearchFriend] = useState("");
  const [isFriend, setIsFriend] = useState(false);
  console.log("id,currentUserId", id, currentUser.id);
  console.log("CurrentUser", currentUser);
  console.log("personInfo", personInfo);
  const init = async () => {
    const responseTrans = await api.get(`user/transcription/${id}`);
    setMyTransList([...responseTrans.data]);
    console.log(MyTransList);
    const responseReview = await api.get(`user/review/${id}`);
    setMyReviewList([...responseReview.data]);
    const confirm = currentUser.friends.filter((each) =>
      each.friendIndex === Number(id) ? setIsFriend(true) : setIsFriend(false)
    );
  };
  const gotoFriendPage = (friendId) => {
    history.push({
      pathname: `/friendPage/${friendId}`,
    });
  };
  const gotoMypage = () => {
    history.push(`/mypage`);
  };
  const handleSearch = async () => {
    const response = await api.post("user/find", null, {
      params: {
        nickName: searchFriend,
      },
    });
    history.push({
      pathname: `/friendPage/${response.data.id}`,
      state: {
        personInfo: response.data,
      },
    });
  };
  const followFriend = async () => {
    const response = await api.post("friend/register", null, {
      params: {
        userId: currentUser.id,
        friendId: id,
      },
    });
    console.log(response.data);
    alert(response.data.message.message);
    history.push("/mypage");
  };
  const deleteFriend = async () => {
    const response = await api.delete("friend/delete", null, {
      params: {
        userId: currentUser.id,
        friendId: id,
      },
    });
    console.log(response.data);
    alert(response.data.message.message);
    history.push("/mypage");
  };
  // let test = currentUser.friends.filter(
  //   (each) => each.friendIndex === Number(id)
  // );
  // console.log(test);
  console.log(currentUser.friends);
  console.log();
  useEffect(() => {
    init();
  }, [id]);

  return (
    <div className="infoCard">
      <div className="infoCard__top">
        <span className="infoCard__top__line" />
        <div className="infoCard__top__profile">
          <div className="infoCard__top__profile__img" />
          <div className="infoCard__top__profile__nickname">
            {personInfo.nickName}
          </div>
          {/* {Number(id) !== currentUser.id && (
            
          )} */}

          {isFriend ? (
            <div onClick={deleteFriend}>이미친구입니다. 삭제하시겠습니까?</div>
          ) : (
            <div onClick={followFriend}>친구추가하기</div>
          )}
        </div>
        <div className="infoCard__top__friendSearch">
          <div className="">
            <FaSearch size="20" className="" />
            <input
              onClick={() => setSearchFriend("")}
              placeholder="정확한 닉네임을 입력하세요"
              onChange={(e) => {
                setSearchFriend(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  // setTitle("");
                }
              }}
              value={searchFriend}
            ></input>
          </div>
        </div>
        <div className="infoCard__top__btn">
          <button onClick={() => setReviewModalOpen(true)}>
            <p>{personInfo.reviewCount}</p> <p>리뷰</p>
          </button>
          <button onClick={() => setTransModalOpen(true)}>
            <p>{personInfo.transcriptionCount}</p>
            <p>필사</p>
          </button>
          <button onClick={() => setFriendModalOpen(true)}>
            <p>{personInfo.friendCount}</p>
            <p>팔로우 목록</p>
          </button>
          <MypageFriendsModal
            isOpen={friendModalOpen}
            onClose={() => setFriendModalOpen(false)}
            data={personInfo.friends}
          />
          <MypageReviewModal
            isOpen={reviewModalOpen}
            onClose={() => setReviewModalOpen(false)}
            data={MyReviewList}
          />
          <MypageTransModal
            isOpen={transModalOpen}
            onClose={() => setTransModalOpen(false)}
            data={MyTransList}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
