import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import { FaSearch } from "react-icons/fa";
import "components/Card/InfoCard.scss";
import Loading from "Contents/Loading";
import MypageList from "../List/MypageList";
import Grass from "components/Card/Grass";
import FollowingList from "components/List/FollowingList";
const InfoCard = ({ personInfo, id }) => {
  const year = new Date().getFullYear();
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const [myTransList, setMyTransList] = useState([]);
  const [myReviewList, setMyReviewList] = useState([]);
  const [viewFriendList, setViewFriendList] = useState(false);
  const [viewReviewList, setViewReviewList] = useState(false);
  const [viewTransList, setViewTransList] = useState(false);
  const [searchFriend, setSearchFriend] = useState("");
  const [isFriend, setIsFriend] = useState(false);
  const init = async () => {
    const responseTrans = await api.get(`user/transcription/${id}`);
    setMyTransList([...responseTrans.data]);
    const responseReview = await api.get(`user/review/${id}`);
    setMyReviewList([...responseReview.data]);
    const confirm = currentUser.friends.filter((each) => {
      each.friendIndex === Number(id) && setIsFriend(true);
    });
  };
  const handleSearch = async () => {
    const response = await api.post("user/find", null, {
      params: {
        userId: currentUser.id,
        nickName: searchFriend,
      },
    });
    alert(response.data.message.message);
    response.data.message.flag &&
      history.push({
        pathname: `/friendPage/${response.data.list[0].id}`,
        state: {
          personInfo: response.data.list[0],
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
    alert(response.data.message.message);
    history.push("/mypage");
  };
  const deleteFriend = async (d) => {
    const response = await api.post("friend/delete", null, {
      params: {
        userId: currentUser.id,
        friendId: d.id,
      },
    });
    alert(response.data.message.message);
    history.push("/mypage");
  };

  useEffect(() => {
    init();
  }, [id, currentUser, personInfo]);
  if (viewTransList) {
    return (
      <div className="infoCard__wrapper">
        <MypageList
          list={myTransList}
          type="transcription"
          onClose={() => {
            setViewTransList(false);
          }}
        />
      </div>
    );
  }
  if (viewReviewList) {
    return (
      <div className="infoCard__wrapper">
        <MypageList
          list={myReviewList}
          type="review"
          onClose={() => {
            setViewReviewList(false);
          }}
        />
      </div>
    );
  }
  if (viewFriendList) {
    return (
      <div className="following__wrapper">
        <FollowingList
          nickName={personInfo.nickName}
          list={personInfo.friends}
          onClose={() => {
            setViewFriendList(false);
          }}
        />
      </div>
    );
  }
  if (!personInfo) return <Loading />;
  else {
    return (
      <>
        <div className="infoCard">
          <div className="infoCard__top">
            <div className="infoCard__top__profile">
              <div className="infoCard__top__profile__nickname">
                {personInfo.nickName}
              </div>
              <div>
                {id === currentUser.id ? null : isFriend ? (
                  <div
                    className="infoCard__top__profile__friendBtn"
                    onClick={() => deleteFriend(personInfo)}
                  >
                    친구 삭제
                  </div>
                ) : (
                  <div
                    className="infoCard__top__profile__friendBtn"
                    onClick={followFriend}
                  >
                    친구 추가
                  </div>
                )}
              </div>
              <div className="infoCard__top__friendSearch">
                {/* <div className="infoCard__top__friendSearch__input"> */}
                <FaSearch
                  size="20"
                  className="infoCard__top__friendSearch__icon"
                />
                <input
                  className="infoCard__top__friendSearch__input"
                  onClick={() => setSearchFriend("")}
                  placeholder="정확한 닉네임을 입력하세요"
                  onChange={(e) => {
                    setSearchFriend(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  value={searchFriend}
                ></input>
                {/* </div> */}
              </div>
              <div className="infoCard__top__btn">
                <button onClick={() => setViewTransList(true)}>
                  <p>{personInfo.transcriptionCount}</p>
                  <p>필사</p>
                </button>
                <button onClick={() => setViewReviewList(true)}>
                  <p>{personInfo.reviewCount}</p> <p>리뷰</p>
                </button>
                <button onClick={() => setViewFriendList(true)}>
                  <p>{personInfo.friends.length}</p>
                  <p>팔로우</p>
                </button>
              </div>
            </div>
          </div>
          <div className="grass">
            <div className="grass__header">
              <h3>독서 후, 하루 한 줄.</h3>
            </div>
            <Grass userId={personInfo.id} year={year} />
          </div>
        </div>
      </>
    );
  }
};

export default InfoCard;
