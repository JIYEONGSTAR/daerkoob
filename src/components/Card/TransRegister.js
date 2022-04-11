// import React, { useState, useEffect } from "react";
// import useCurrentUser from "Hooks/useCurrentUser";
// import api from "api/api";
// import { useHistory } from "react-router-dom";
// import { currentContent } from "Store";
// const TransRegister = ({ toggle, isbn, update }) => {
//   const [currentContent, setCurrentContent] = useState("");
//   const { currentUser } = useCurrentUser();
//   const [currentBook, setCurrentBook] = useState([]);
//   const history = useHistory();
//   const handleChange = (e) => {
//     setCurrentContent(e.target.value);
//   };
//   const handleSubmit = async () => {
//     const response = await api.post("transcription/register", null, {
//       params: {
//         userId: currentUser.id,
//         //  isbn: isbn.replace(/(\s*)/g, ""),
//         isbn,
//         transcriptionContent: currentContent,
//       },
//     });
//     if (response.data) {
//       alert(response.data.message);

//       update();
//       setCurrentContent("");
//     }
//   };
//   // useEffect(() => {
//   //   const findBook = async () => {
//   //     const response = await api.get(`book/find/${isbn}`);
//   //     setCurrentBook(response.data);
//   //   };
//   //   findBook();
//   // }, []);
//   const scrollTop = () => {
//     window.scrollTo(0, 0);
//   };
//   return (
//     <div className="detail__trans__wrapper">
//       {currentUser.id !== 0 && (
//         <div className="detail__trans__register">
//           {/* <div>책제목:{currentBook.title}</div> */}
//           <textarea
//             className="bookDatail__input"
//             cols="40"
//             rows="20"
//             onChange={handleChange}
//             value={currentContent}
//           ></textarea>
//           <div>
//             <button onClick={handleSubmit}>저장</button>
//           </div>
//           <div>
//             {/* {currentContent} */}
//             {/* <button onClick={toggle}>다른사람 쓴 글 보러가기</button> */}
//           </div>
//         </div>
//       )}
//       <button onClick={scrollTop} className="toTop">
//         맨 위로 가기
//       </button>
//     </div>
//   );
// };

// export default TransRegister;
