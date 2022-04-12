// import React, { useState } from "react";
// import useCurrentUser from "Hooks/useCurrentUser";
// import api from "api/api";
// import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
// import "components/List/ReviewList.scss";
// import ReviewModal from "components/Modal/ReviewModal";
// import ReviewCard from "components/Card/ReviewCard";
// const ReviewList = ({ data, onThumb, onComment, from }) => {
//   const { currentUser } = useCurrentUser();
//   // const followFriend = async (d) => {
//   //   const response = await api.post("friend/add", null, {
//   //     params: {
//   //       userId: currentUser.id, //나
//   //       friendId: d.id, //내가 친구하고 싶은 사람
//   //     },
//   //   });
//   //   alert(response.data.message);
//   // };
//   const handleThumb = async (d) => {
//     const response = await api.post("thumb/review", null, {
//       params: {
//         userIndex: currentUser.id, //좋아요누르는사람
//         reviewId: d.id, //리뷰아이디
//       },
//     });
//     onThumb();
//   };
//   return (
//     <div className="review">
//       {data ? (
//         data.map((d) => (
//           <div className="review__list">
//             <ReviewCard data={d} />
//             <button
//               onClick={() => handleThumb(d)}
//               style={{ cursor: "pointer" }}
//             >
//               {from ? (
//                 <span>좋아요개수</span>
//               ) : (
//                 <>{d.thumbJudge ? <FaThumbsUp /> : <FaRegThumbsUp />}</>
//               )}
//               :{d.thumbCount}
//             </button>
//           </div>
//         ))
//       ) : (
//         <>리뷰가 없습니다.</>
//       )}

//     </div>
//   );
// };

// export default ReviewList;
