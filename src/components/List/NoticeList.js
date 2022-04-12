import React from "react";

const NoticeList = ({ data }) => {
  return (
    <>
      {data.map((d) => (
        <div className="noticeList">
          <div>{d.title}</div>
          <div>{d.content}</div>
          <div>{d.registerDate.slice(0, 10)}</div>
        </div>
      ))}
    </>
  );
};

export default NoticeList;
