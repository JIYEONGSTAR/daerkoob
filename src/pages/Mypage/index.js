import React from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import "pages/Mypage/index.scss";
import "slick-carousel/slick/slick-theme.css";
import InfoCard from "components/Card/InfoCard";
import Grass from "components/Card/Grass";
const Mypage = () => {
  const { currentUser } = useCurrentUser();
  const year = new Date().getFullYear();
  return (
    <div className="mypage">
      <InfoCard personInfo={currentUser} id={currentUser.id} />
      <div className="grass">
        <Grass userId={currentUser.id} year={year} />
      </div>
    </div>
  );
};

export default Mypage;
