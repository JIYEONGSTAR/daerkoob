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
  //console.log("id,currentUserId", id, currentUser.id);
  //console.log("CurrentUser", currentUser);
  //console.log("personInfo", personInfo);
  const init = async () => {
    const responseTrans = await api.get(`user/transcription/${id}`);
    setMyTransList([...responseTrans.data]);
    //  //console.log(yTransList);
    const responseReview = await api.get(`user/review/${id}`);
    setMyReviewList([...responseReview.data]);
    const confirm = currentUser.friends.filter(
      (each) => {
        each.friendIndex === Number(id) && setIsFriend(true);
        //  //console.log(each);
      }
      // { //console.log(each)}
    );
  };
  //console.log(isFriend);
  // const gotoFriendPage = (friendId) => {
  //   history.push({
  //     pathname: `/friendPage/${friendId}`,
  //   });
  // };
  // const gotoMypage = () => {
  //   history.push(`/mypage`);
  // };
  const handleSearch = async () => {
    const response = await api.post("user/find", null, {
      params: {
        userId: currentUser.id,
        nickName: searchFriend,
      },
    });
    alert(response.data.message.message);
    //console.log(response);
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
    //console.log(response);
    alert(response.data.message.message);
    history.push("/mypage");
  };
  const deleteFriend = async (d) => {
    //console.log(d);
    const response = await api.post("friend/delete", null, {
      params: {
        userId: currentUser.id,
        friendId: d.id,
      },
    });
    //console.log(response);
    alert(response.data.message.message);
    history.push("/mypage");
  };
  // let test = currentUser.friends.filter(
  //   (each) => each.friendIndex === Number(id)
  // );
  //  //console.log(test);

  useEffect(() => {
    init();
  }, [id]);
  //  //console.log(personInfo);
  if (viewTransList) {
    return (
      <MypageList
        list={myTransList}
        type="transcription"
        onClose={() => {
          setViewTransList(false);
        }}
      />
    );
  }
  if (viewReviewList) {
    return (
      <MypageList
        list={myReviewList}
        type="review"
        onClose={() => {
          setViewReviewList(false);
        }}
      />
    );
  }
  if (viewFriendList) {
    return (
      <FollowingList
        list={personInfo.friends}
        onClose={() => {
          setViewFriendList(false);
        }}
      />
    );
  }
  if (!personInfo) return <Loading />;
  else {
    return (
      <>
        <div className="infoCard">
          <div className="infoCard__top">
            <span className="infoCard__top__line" />
            <div className="infoCard__top__profile">
              <div className="infoCard__top__profile__img" />
              <div className="infoCard__top__profile__nickname">
                {personInfo.nickName}
              </div>
              {id === currentUser.id ? null : isFriend ? (
                <div onClick={() => deleteFriend(personInfo)}>
                  이미친구입니다. 삭제하시겠습니까?
                </div>
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
              <button onClick={() => setViewTransList(true)}>
                <p>{personInfo.transcriptionCount}</p>
                <p>필사</p>
              </button>
              <button onClick={() => setViewReviewList(true)}>
                <p>{personInfo.reviewCount}</p> <p>리뷰</p>
              </button>
              <button onClick={() => setViewFriendList(true)}>
                <p>{personInfo.friendCount}</p>
                <p>팔로우 목록</p>
              </button>
            </div>
          </div>
        </div>
        <div className="grass">
          <Grass userId={currentUser.id} year={year} />
        </div>
      </>
    );
  }
};

export default InfoCard;
