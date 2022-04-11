import React, { useState, useEffect } from "react";
import "./TransList.scss";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import api from "api/api";
import useCurrentUser from "Hooks/useCurrentUser";
import Loading from "Contents/Loading";
const EachTransList = ({ list }) => {
  if (!list) return <Loading />;
  return (
    <>
      {list.length === 0 ? (
        <div>내용이 없습니다</div>
      ) : (
        <>
          {list.map((each) => (
            <div className="">
              <span className="">{each.content}</span>
              <span className="">{each.user.nickName}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
};
const TransList = ({ isbn, type }) => {
  const { currentUser } = useCurrentUser();
  const [list, setList] = useState();
  const [page, setPage] = useState(0);
  const findList = async () => {
    const response = await api.get(
      `${type}/inquiry/${currentUser.id}/${isbn}/0`
    );
    setList(response.data.list);
  };

  useEffect(() => {
    findList();
  }, [page]);

  return (
    <div className="transList">
      <EachTransList list={list} />
    </div>
  );
};

export default TransList;
