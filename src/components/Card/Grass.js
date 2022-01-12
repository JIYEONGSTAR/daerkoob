import React, { useEffect, useState } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import "components/Card/Grass.scss";
import GrassBlock from "./GrassBlock";
const Grass = ({ userId, year }) => {
  //   const { currentUser } = useCurrentUser();
  //   const response = ""

  const [list, setList] = useState([]);
  useEffect(() => {
    const init = async () => {
      const response = await api.get(`user/record/${userId}/${year}`);
      console.log(response);
      setList([...response.data.grass]);
    };
    init();
    return () => {};
  }, []);
  console.log(list);
  //   const year = new Date().getFullYear();
  //   console.log(year);
  //   var year = now.getFullYear();	// 연도

  // const firstDateOfYear = new Date(years, 0, 1).getDay();
  // const lastDateOfYear = new Date(years, 11, 31).getDay();
  // console.log(firstDateOfYear);
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  // for (let i = 0; i < firstDateOfYear; i++) {
  //   list.unshift({ commit: null, date: null });
  // }
  // for (let i = 7; i > lastDateOfYear + 1; i--) {
  //   // console.log("a");
  //   list.push({ commit: null, date: null });
  // }
  const month = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return (
    <div className="grass__wrapper">
      <div className="grass__wrapper__column">
        {month.map((d) => (
          <span>{d}</span>
        ))}
      </div>
      <div className="grass__wrapper__row">
        {day.map((d) => (
          <span className="day">{d}</span>
        ))}
        {list.map((d) => (
          <GrassBlock d={d} />
        ))}
      </div>
    </div>
  );
};

export default Grass;
