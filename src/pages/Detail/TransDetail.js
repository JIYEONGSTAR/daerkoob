import BulletinCard from "components/Card/BulletinCard";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
import "./TransDetail.scss";

const TransDetail = ({ match }) => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  const { params } = match; //url params
  const id = params.id;
  const [data, setData] = useState([]);

  const findData = async () => {
    const response = await api.get(
      `transcription/inquiry/${currentUser.id}/${id}`
    );

    setData(...response.data.list);
  };
  useEffect(() => {
    findData();
  }, []);
  if (data) {
    return (
      <div className="transDetail">
        <div className="transDetail__wrapper">
          <BulletinCard
            data={data}
            type="transcription"
            onThumb={() => findData()}
          />
        </div>
      </div>
    );
  }
};

export default TransDetail;
