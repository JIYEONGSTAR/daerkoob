import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";

import MypageFriendsModal from "components/Modal/MypageFriendsModal";
import MypageReviewModal from "components/Modal/MypageReviewModal";
import MypageTransModal from "components/Modal/MypageTransModal";
import "components/Card/InfoCard.scss";
const InfoCard = ({ person, id }) => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const [MyTransList, setMyTransList] = useState([]);
  const [MyReviewList, setMyReviewList] = useState([]);
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [transModalOpen, setTransModalOpen] = useState(false);

  const init = async () => {
    const responseTrans = await api.get(`user/transcription/${id}`);
    setMyTransList([...responseTrans.data]);
    console.log(MyTransList);
    const responseReview = await api.get(`user/review/${id}`);
    setMyReviewList([...responseReview.data]);
  };
  const gotoFriendPage = (friendId) => {
    history.push({
      pathname: `/friendPage/${friendId}`,
    });
  };
  const gotoMypage = () => {
    history.push(`/mypage`);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="infoCard">
      <div className="infoCard__top">
        <span className="infoCard__top__line" />
        <div className="infoCard__top__profile">
          <div className="infoCard__top__profile__img" />
          <div className="infoCard__top__profile__nickname">
            {currentUser.nickName}
          </div>
        </div>
        {/* <div className="infoCard__top__friendRegister">

        </div> */}
        <div className="infoCard__top__btn">
          <button onClick={() => setReviewModalOpen(true)}>
            <p>{MyTransList.length}</p> <p>리뷰</p>
          </button>
          <button onClick={() => setTransModalOpen(true)}>
            <p>{MyReviewList.length}</p>
            <p>필사</p>
          </button>
          <button onClick={() => setFriendModalOpen(true)}>
            <p>{currentUser.friends.length}</p>
            <p>친구</p>
          </button>
          <MypageFriendsModal
            isOpen={friendModalOpen}
            onClose={() => setFriendModalOpen(false)}
            data={currentUser.friends}
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
