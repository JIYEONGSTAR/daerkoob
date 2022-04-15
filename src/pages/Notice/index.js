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
  const [size, setSize] = useState(0);
  const getNotice = async () => {
    const response = await api.get(`notice/inquiry/${page}`);
    console.log("notice", response);
    setNoticeList(response.data.list);
    setTotalPage(response.data.totalSize);
    setSize(response.data.list.length);
  };
  useEffect(() => {
    getNotice();
  }, [page]);
  const handlePageChange = (num) => {
    setPage(num);
  };

  if (size < 10) {
    if (noticeList) {
      console.log(noticeList);
      for (let i = size; i < 10; i++) {
        console.log(i, "플러스해야함");
        console.log(noticeList);
        // let newList = [
        //   ...list,
        //   { content: "없어요", user: { nickName: "없어" } },
        // ];
        // console.log(newList);
        setNoticeList((pervState) => [
          ...pervState,
          { content: "", id: "", registerDate: "", title: "" },
        ]);

        console.log(noticeList);
        setSize((prev) => prev + 1);
        // console.log([...list]);
      }
    }
  }
  // const { currentUser } = useCurrentUser();
  return (
    <div className="notice">
      <div className="notice__wrapper">
        <div className="noticeList">
          <div className="noticeList__header">
            <h2>공지사항</h2>
          </div>
          <NoticeList data={noticeList} />
        </div>
        <div className="adminButton">
          {currentUser.id === 1 && (
            <button
              onClick={() => {
                history.push(`/noticeAdmin`);
              }}
            >
              관리자용 작성버튼
            </button>
          )}
        </div>
        <div className="pagination">
          <Pagination
            setNumber={handlePageChange}
            total={totalPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default Notice;
