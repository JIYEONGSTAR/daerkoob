import React, { useEffect, useState } from "react";
import "./index.scss";
// import InfoCard from "components/Card/InfoCard";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Pagination from "components/Utils/Pagination";
import NoticeList from "components/List/NoticeList";
import { useHistory } from "react-router-dom";
const Notice = (props) => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    const getNotice = async () => {
      const response = await api.get(`notice/inquiry/${page}`);
      console.log("notice", response);
      setNoticeList(response.data.list);
      setTotalPage(response.data.totalSize);
    };

    getNotice();
  }, []);
  const handlePageChange = (num) => {
    setPage(num);
  };

  // const { currentUser } = useCurrentUser();
  return (
    <div className="notice">
      <NoticeList data={noticeList} />
      <Pagination setNumber={handlePageChange} total={totalPage} page={page} />

      {currentUser.id === 16 && (
        <button
          onClick={() => {
            history.push(`/noticeAdmin`);
          }}
        >
          관리자용 작성버튼
        </button>
      )}
    </div>
  );
};

export default Notice;
