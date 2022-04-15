import React, { useEffect, useState } from "react";
import api from "api/api";
import "components/Card/Grass.scss";
import GrassBlock from "./GrassBlock";
const Grass = ({ userId, year }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const init = async () => {
      const response = await api.get(`user/record/${userId}/${year}`);
      setList([...response.data.grass]);
    };
    init();
  }, [userId]);

  const day = ["일", "월", "화", "수", "목", "금", "토"];
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
