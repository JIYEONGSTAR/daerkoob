// import React, { useEffect, useCallback, useState } from "react";
// import useCurrentUser from "Hooks/useCurrentUser";
// import api from "api/api";
// import ReviewList from "components/List/ReviewList";
// import "./index.scss";
// import Pagination from "components/Card/Pagination";
// import BookRegister from "components/Card/BookRegister";

// const ReviewDetail = ({ isbn, register }) => {
//   const { currentUser } = useCurrentUser();
//   const [otherReview, setOtherReview] = useState([]);
//   const [reviewPage, setReviewPage] = useState(0);
//   const [totalReviewPage, setTotalReviewPage] = useState(0);
//   const [openRegister, setOpenRegister] = useState(register);
//   const handleReviewExist = useCallback(async () => {
//     const response = await api.get(
//       `review/inquiry/${currentUser.id}/${isbn}/${reviewPage}`
//     );
//     setTotalReviewPage(response.data.totalSize);
//     let preData = [];
//     if (response.data.totalSize > 0) {
//       response.data.list.forEach((item) => {
//         preData.push(item);
//       });
//       setOtherReview(preData);
//     }
//   }, [reviewPage]);
//   useEffect(() => {
//     handleReviewExist();
//   }, [handleReviewExist]);
//   const handlePageChange = (num) => {
//     setReviewPage(num);
//   };
//   const handleThumb = () => {
//     handleReviewExist();
//   };
//   const handleComment = () => {};

//   return (
//     <>
//       <button onClick={() => setOpenRegister(!openRegister)}>
//         {openRegister ? <>리뷰보러가기</> : <>리뷰작성하러가기</>}
//       </button>
//       {openRegister ? (
//         <BookRegister
//           isbn={isbn}
//           onClick={() => {
//             setOpenRegister(false);
//           }}
//           setOpenRegister={setOpenRegister}
//           update={handleReviewExist}
//         />
//       ) : (
//         <>
//           <ReviewList
//             data={otherReview}
//             onThumb={handleThumb}
//             onComment={handleComment}
//           />
//           <Pagination
//             setNumber={handlePageChange}
//             total={totalReviewPage}
//             page={reviewPage}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default ReviewDetail;
import BulletinCard from "components/Card/BulletinCard";
import React, { useState, useEffect } from "react";
import "./index.scss";
import CommentCard from "components/Card/CommentCard";
import { useHistory } from "react-router-dom";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Loading from "Contents/Loading";
const ReviewDetail = ({ location, match }) => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  const { params } = match; //url params
  const id = params.id;
  const [data, setData] = useState();
  const [writer, setWriter] = useState();
  const findData = async () => {
    const response = await api.get(`review/inquiry/${currentUser.id}/${id}`);

    console.log("reveiwsDetail", response.data);

    setData(...response.data.list);
    // setWriter(response.data.list.user.nickName);
    // console.log(writer);
  };
  useEffect(() => {
    findData();
  }, []);

  if (!data) return <Loading />;
  return (
    <div className="reviewDetail">
      <BulletinCard data={data} type="review" onThumb={() => findData()} />
      <CommentCard data={data} update={() => findData()} />
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로가기
      </button>
      {/* {writer.nickName === currentUser.nickName && <div>똑같다</div>} */}
    </div>
  );
};

export default ReviewDetail;
