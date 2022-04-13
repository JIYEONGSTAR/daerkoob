import BulletinCard from "components/Card/BulletinCard";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
import "./TransDetail.scss";

const TransDetail = ({ location, match }) => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  const { params } = match; //url params
  const id = params.id;
  const [data, setData] = useState([]);

  const findData = async () => {
    const response = await api.get(
      `transcription/inquiry/${currentUser.id}/${id}`
    );

    console.log("transDetail", response.data);
    // console.log(...response.data.list);
    // const preData = [...response.data.list];
    // console.log("preData", preData);
    // let preData = [];
    // response.data.list.forEach((item) => {
    //   preData.push(item);
    // });
    setData(...response.data.list);
    // console.log(data);
    // setData(preData);
  };
  useEffect(() => {
    findData();
  }, []);
  if (data) {
    console.log(data);
    // return <Loading />;
    return (
      <div className="transDetail">
        <BulletinCard
          data={data}
          type="transcription"
          onThumb={() => findData()}
        />
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          뒤로가기
        </button>
      </div>
    );
  }
};

export default TransDetail;
