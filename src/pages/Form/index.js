import React from "react";

import "./index.scss";
import FormList from "components/List/FormList";
import useCurrentBooks from "Hooks/useCurrentBooks";
const Form = ({ location }) => {
  const { currentBooks } = useCurrentBooks();
  const title = location.state.title;
  return (
    <div className="form">
      <div className="form__header">
        <strong>"{title}"</strong>에 대한 검색 결과
      </div>
      {currentBooks && (
        <div className="form__wrapper">
          <FormList data={currentBooks} />
        </div>
      )}
    </div>
  );
};

export default Form;
