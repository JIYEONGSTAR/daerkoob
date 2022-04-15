import React, { useEffect } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import "pages/Mypage/index.scss";
import "slick-carousel/slick/slick-theme.css";
import InfoCard from "components/Card/InfoCard";
import api from "api/api";
const Mypage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const getMyInfo = async () => {
    const response = await api.get(`user/${currentUser.id}`);
    setCurrentUser(response.data);
  };
  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <div className="mypage">
      <InfoCard personInfo={currentUser} id={currentUser.id} />
    </div>
  );
};

export default Mypage;
