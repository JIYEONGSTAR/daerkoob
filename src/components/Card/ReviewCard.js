// import React, { useState } from "react";
// import ReviewModal from "components/Modal/ReviewModal";
// const ReviewCard = ({ data }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };
//   return (
//     <>
//       <div className="review__box" onClick={openModal}>
//         <div>리뷰:{data.content}</div>
//         유저닉네임:{data.user.nickName}
//         <div>책제목 :{data.book.title}</div>
//         <div> 리뷰 쓴 사람이 준 별점:{data.score}</div>
//       </div>

//       <ReviewModal isOpen={modalOpen} close={closeModal} data={data} />
//     </>
//   );
// };

// export default ReviewCard;
