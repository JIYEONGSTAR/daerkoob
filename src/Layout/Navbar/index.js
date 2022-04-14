import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import useCurrentBooks from "Hooks/useCurrentBooks";
import "./index.scss";
import { FaSearch } from "react-icons/fa";
import { AiOutlineNotification } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import logo from "images/daerkooblogo.png";

const Navbar = () => {
  const history = useHistory();
  // const activeStyle = {
  //   background: "black",
  //   color: "white",
  // };
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { currentBooks, setCurrentBooks } = useCurrentBooks();

  const [title, setTitle] = useState("");
  const handleLogout = () => {
    setCurrentUser({ id: 0 });
    localStorage.removeItem("currentUserState");
    history.push("/");
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleKeyPress = (e) => {
    //엔터키로 입력하기
    if (e.key === "Enter") {
      handleSubmit();
      // setTitle("");
    }
  };
  const handleSubmit = async () => {
    try {
      await api
        .post("book/find", null, {
          params: {
            title: title,
            display: 18,
          },
        })
        .then((response) => {
          setCurrentBooks([...response.data]);
          history.push({pathname:"/form",state:{title:title},});
        });
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="nav">
      <div className="nav__left">
        <Link to="/">
          <img className="nav__left__logo" src={logo} alt="" />
        </Link>
      </div>

      <div className="nav__input">
        <FaSearch size="20" className="nav__input__icon" />
        <input
          onClick={() => setTitle("")}
          placeholder="제목, 작가, 출판사 입력"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={title}
        ></input>
      </div>
      <div className="nav__right">
        <div className="nav__right__c1">
          <Link to="/notice">
            <AiOutlineNotification size="25" />
          </Link>
        </div>
        <div className="nav__right__c1">
          <Link to="/mypage">
            <CgProfile size="25" />
          </Link>
        </div>

        {currentUser.id !== 0 ? (
          // <div className="nav__right">
          <div>
            <button className="nav__button" onClick={handleLogout}>
              {" "}
              로그아웃
            </button>
          </div>
        ) : (
          // </div>
          // <div className="nav__right">
          <button className="nav__button">
            <Link to="/auth"> 로그인</Link>
          </button>
          // </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
