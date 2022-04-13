import React from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import "pages/Mypage/index.scss";
import "slick-carousel/slick/slick-theme.css";
import InfoCard from "components/Card/InfoCard";

const Mypage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();

  return (
    <div className="mypage">
      <InfoCard personInfo={currentUser} id={currentUser.id} />
    </div>
  );
};

export default Mypage;
