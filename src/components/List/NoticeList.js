import React from "react";

const NoticeList = ({ data }) => {
  return (
    <>
      {data.map((notice) => (
        <div className="noticeLine">
          <div className="noticeLine__title">{notice.title}</div>
          <div className="noticeLine__registerDate">{notice.registerDate.slice(0, 10)}</div>
        </div>
      ))}
    </>
  );
};

export default NoticeList;
