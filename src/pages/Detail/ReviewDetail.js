import BulletinCard from "components/Card/BulletinCard";
import React, { useState, useEffect } from "react";
import "./index.scss";
import CommentCard from "components/Card/CommentCard";
import { useHistory } from "react-router-dom";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
import "./ReviewDetail.scss";
const ReviewDetail = ({ location, match }) => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  const { params } = match; //url params
  const id = params.id;
  const [data, setData] = useState();
  const [writer, setWriter] = useState();
  const findData = async () => {
    const response = await api.get(`review/inquiry/${currentUser.id}/${id}`);

    setData(...response.data.list);
  };
  useEffect(() => {
    findData();
  }, []);

  if (!data) return <Loading />;
  return (
    <div className="reviewDetail">
      <div className="reviewDetail__wrapper">
        <BulletinCard data={data} type="review" onThumb={() => findData()} />
        <div className="reviewDetail__comments">
          <CommentCard data={data} update={() => findData()} />
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
