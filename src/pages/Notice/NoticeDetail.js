import React, { useEffect, useState } from "react";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";
import { useHistory } from "react-router-dom";
import "./NoticeDetail.scss";

const NoticeDetail = ({ match }) => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const { params } = match;
  const id = params.id;
  const [data, setData] = useState();
  const findData = async () => {
    const response = await api.get(`notice/${id}`);
    setData(response.data);
  };
  const handleDelete = async (id) => {
    const response = await api.post(`notice/delete`, null, {
      params: {
        id: id,
      },
    });
    alert(response.data.message.message);
    history.push("/notice");
  };
  useEffect(() => {
    findData();
  }, []);
  if (!data) return <Loading />;
  return (
    <div className="noticeDetail">
      <div className="noticeDetail__wrapper">
        <div className="noticeDetail__header">
          <div className="noticeDetail__header__title">{data.title}</div>
          <div className="noticeDetail__header__date">
            {data.registerDate.split("T").join(" ")}에 작성됨
          </div>
        </div>
        <div className="noticeDetail__body">
          <div className="noticeDetail__body__content">{data.content}</div>
          <div className="noticeDetail__body__button">
            {currentUser.id === 1 && (
              <button onClick={() => handleDelete(data.id)}>공지삭제</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
