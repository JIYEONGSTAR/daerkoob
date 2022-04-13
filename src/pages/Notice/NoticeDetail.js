import React, { useEffect, useState } from "react";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";
import "./NoticeDetail.scss"
const NoticeDetail = ({ match }) => {
  const { currentUser } = useCurrentUser();
  const { params } = match;
  const id = params.id;
  console.log(id);
  const [data, setData] = useState();
  const findData = async () => {
    const response = await api.get(`notice/${id}`);
    console.log(response);
    setData(response.data);
  };
  const handleDelete = async (id) => {
    console.log(id);
    const response = await api.post(`notice/delete`, null, {
      params: {
        id: id,
      },
    });
  };
  useEffect(() => {
    findData();
  }, []);
  if (!data) return <Loading />;
  return (
    <div className="noticeDetail">
      <div className="noticeDetail__header">
        <div className="noticeDetail__header__title">
          {data.title}
        </div>
        <div className="noticeDetail__header__date">
          {data.registerDate.split("T").join(" ")}에 작성됨
        </div>
      </div>
      <div className="noticeDetail__body">
        <div className="noticeDetail__body__content">
          {data.content}
        </div>
        <div className="noticeDetail__body__button">
          {currentUser.id === 16 && (
            <button onClick={() => handleDelete(data.id)}>공지삭제</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
