import React, { useEffect, useState } from "react";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";
import { useHistory } from "react-router-dom";
const NoticeDetail = ({ match }) => {
  const history = useHistory();
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
    alert(response.data.message.message);
    history.push("/notice");
    // console.log(response);
  };
  useEffect(() => {
    findData();
  }, []);
  if (!data) return <Loading />;
  return (
    <div style={{ marginTop: "70px" }}>
      {console.log(data)}
      {data.title}
      {data.content}
      {data.registerDate}
      {currentUser.id === 16 && (
        <button onClick={() => handleDelete(data.id)}>공지삭제</button>
      )}
    </div>
  );
};

export default NoticeDetail;
