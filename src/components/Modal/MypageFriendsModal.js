// import React, { useEffect } from "react";
// import Modal from "react-modal";
// const MypageFriendsModal = ({ isOpen, onClose, data }) => {
//   const customStyles = {
//     overlay: {
//       background: "rgba(127, 127, 127, 0.5)",
//     },
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       border: "1px solid black",
//       borderRadius: "20px",
//     },
//   };
//   // useEffect(() => {
//   //   document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
//   //   return () => {
//   //     const scrollY = document.body.style.top;
//   //     document.body.style.cssText = `position: ""; top: "";`;
//   //     window.scrollTo(0, parseInt(scrollY || "0") * -1);
//   //   };
//   // }, []);
//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
//       MypageFriendsModal
//       <button onClick={onClose}>닫기</button>
//       {data.map((d) => (
//         <div>
//           <span>{d.friendNickName}</span>
//           <span>{d.friendIndex}</span>
//         </div>
//       ))}
//     </Modal>
//   );
// };

// export default MypageFriendsModal;
import React from "react";

const MypageFriendsModal = () => {
  return <div>MypageFriendsModal</div>;
};

export default MypageFriendsModal;
