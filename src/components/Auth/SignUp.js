import React, { useState } from "react";
import Input from "./Input";
import api from "api/api";
export const SignUp = ({ toggleIsSignIn }) => {
  const [info, setInfo] = useState({
    userId: "",
    nickName: "",
    password: "",
    confirmPassword: "",
    birth: "",
  });

  const handleChange = (e) => {
    const {
      target: { value, id },
    } = e;
    setInfo({ ...info, [id]: value });
  };
  const handleSubmit = async () => {
    try {
      await api
        .post("user/signup", null, {
          params: {
            userId: info.userId,
            name: info.name,
            nickName: info.nickName,
            password: info.password,
            confirmPassword: info.confirmPassword,
            birth: info.birth,
          },
        })
        .then((response) => {
          if (response.data.flag) {
            alert("회원 가입 성공 ");
            toggleIsSignIn(); //회원가입 하고 바로 로그인페이지로 가기
          } else {
            alert(response.data.message);
          }
        });
    } catch {
      console.log("error");
    }
  };
  const handleKeyPress = (e) => {
    //엔터키로 입력하기
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="auth">
      <Input
        id="userId"
        placeholder="아이디"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Input
        id="name"
        placeholder="이름"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Input
        id="nickName"
        placeholder="닉네임"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Input
        id="password"
        placeholder="비밀번호"
        onChange={handleChange}
        type="password"
        onKeyPress={handleKeyPress}
      />
      <Input
        id="confirmPassword"
        placeholder="비밀번호 확인"
        type="password"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Input
        id="birth"
        placeholder="생일"
        type="date"
        onChange={handleChange}
      />
      <button onClick={handleSubmit} style={{ margin: "5%" }}>
        회원가입하기
      </button>
      <span className="auth__noti">
        이미 계정이 있으신가요? &nbsp;&nbsp;
        <strong onClick={toggleIsSignIn}>로그인</strong>
      </span>
    </div>
  );
};
