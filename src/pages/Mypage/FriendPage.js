import InfoCard from "components/Card/InfoCard";
import React from "react";
import Grass from "components/Card/Grass";
import "pages/Mypage/index.scss";
const FriendPage = ({ match, location }) => {
  const id = match.params.id;
  //console.log(location.state.personInfo);
  const personInfo = location.state.personInfo;

  if (personInfo) {
    return (
      <div className="friendPage">
        <InfoCard personInfo={personInfo} id={id} />
      </div>
    );
  }
};

export default FriendPage;
