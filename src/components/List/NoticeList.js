import React from "react";
import { useHistory } from "react-router-dom";
const EachNotice = ({ notice }) => {
  const history = useHistory();
  return (
    <div
      className="noticeLine"
      onClick={() => {
        history.push(`/noticeDetail/${notice.id}`);
      }}
    >
      <div className="noticeLine__title">{notice.title}</div>
      <div className="noticeLine__registerDate">
        {notice.registerDate.slice(0, 10)}
      </div>
    </div>
  );
};
const NoticeList = ({ data }) => {
  return (
    <>
      {data.map((notice) => (
        <EachNotice notice={notice} />
      ))}
    </>
  );
};

export default NoticeList;
