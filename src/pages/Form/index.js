import React from "react";

import "./index.scss";
import FormList from "components/List/FormList";
import useCurrentBooks from "Hooks/useCurrentBooks";
// import _data from "book.json";
const Form = ({location}) => {
  // const mockData = _data.concat();
  // console.log(mockData);
  // const toggleForm = () => {
  //   console.log(currentForm);
  //   setCurrentForm((prevForm) =>
  //     prevForm === "필사페이지" ? "리뷰페이지" : "필사페이지"
  //   );
  // };
  //const [data, setData] = useState([]);
  const { currentBooks } = useCurrentBooks();
  const title = location.state.title;
  return (
    <div className="form">
     
      <div className="form__header"><strong>"{title}"</strong>에 대한 검색 결과</div>
      {currentBooks && (
        <div className="form__wrapper">
          <FormList data={currentBooks} />
        </div>
      )}
    </div>
  );
};

export default Form;
