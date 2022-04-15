import React, { useState, useEffect } from "react";
import "pages/Home/index.scss";
import HomeCard from "components/Card/HomeCard";
import BookCard from "components/Card/BookCard";
// import _data from "book.json";
import api from "api/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewList from "components/List/NewList";
import Loading from "Contents/Loading";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import InfoCard from "components/Card/InfoCard";

const Home = () => {
  // const mockData = _data.concat();
  const [totalTrans, setTotalTrans] = useState(0); //전체 필사수
  const [totalReview, setTotalReview] = useState(0); //전체 리뷰수
  const [totalBook, setTotalBook] = useState(0); //등록된 책 수
  const [bestBook, setBestBook] = useState(); //베스트책
  const [newTrans, setNewTrans] = useState();
  const [newReview, setNewReview] = useState();
  // const img_link =  "https://resource.grapplet.com/marketplace/7176/1591667231081/i.svg.preview.580x870.png";
  const TransCount = async () => {
    const response = await api.get("transcription/count");
    setTotalTrans(response.data);
  };
  const ReviewCount = async () => {
    const response = await api.get("review/count");
    setTotalReview(response.data);
  };
  const BookCount = async () => {
    const response = await api.get("book/count");
    setTotalBook(response.data);
  };
  const BookBest = async () => {
    const response = await api.get("book/best");
    setBestBook(response.data);
  };
  const NewTrans = async () => {
    const response = await api.get("transcription/recent");
    setNewTrans(response.data);
  };
  const NewReview = async () => {
    const response = await api.get("review/recent");
    setNewReview(response.data);
  };
  useEffect(() => {
    TransCount();
    ReviewCount();
    BookCount();
    BookBest();
    NewTrans();
    NewReview();
    return () => {
      // cleanup;
    };
  }, []);
  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "black" }}
  //       onClick={onClick}
  //     />
  //   );
  // }

  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "black" }}
  //       onClick={onClick}
  //     />
  //   );
  // }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    // autoplaySpeed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <FaAngleLeft size="20px" fill="black" />,
    nextArrow: <FaAngleRight size="20px" fill="black" />,
  };
  var bannerSettings = {
    // dots: true,
    infinite: true,
    speed: 750,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <FaAngleLeft size="20px" fill="black" />,
    // nextArrow: <FaAngleRight size="20px" fill="black" />,
  };

  if (!newTrans || !newReview || !bestBook) return <Loading />;
  // if (!newReview) return <Loading />;

  return (
    <div className="home">
      {/* <Slider>
          {bannerIMG.map((d) => (
            <img src="banner_1.jpeg" alt="" />
          ))}
        </Slider> */}
      <div className="home__banner">
        <Slider {...bannerSettings}>
          <img src="banner_1.jpeg" />
          <img src="banner_2.jpeg" />
          <img src="banner_3.jpeg" />
        </Slider>
      </div>
      <div className="home__container">
        <HomeCard name="전체 필사 수" data={totalTrans} />
        <HomeCard name="전체 리뷰 수" data={totalReview} />
        <HomeCard name="등록된 책 수" data={totalBook} />
      </div>

      <div className="home__newList">
        <div className="home__newList__trans">
          <div className="home__newList__header">
            <h3>새로운 필사</h3>
          </div>
          <div className="home__newList__line">
            {newTrans.map((d) => (
              <NewList data={d} type="transcription" />
            ))}
          </div>
        </div>
        <div className="newList__review">
          <div className="home__newList__header">
            <h3>새로운 리뷰</h3>
          </div>
          <div className="home__newList__line">
            {newReview.map((d) => (
              <NewList data={d} type="review" />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="home__container"> */}
      <div className="home__slider">
        <Slider {...settings}>
          {bestBook.map((d) => (
            <BookCard title={d.title} image={d.image} data={d} />
          ))}
        </Slider>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
