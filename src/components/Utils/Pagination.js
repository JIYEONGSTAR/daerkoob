import React from "react";
import "./Pagination.scss";

const PageNum = ({ index, handlePageChange, thisPage }) => {
  console.log(thisPage);
  return (
    <>
      {thisPage === index ? (
        <div className="paginationButton_isSelected"
          onClick={() => handlePageChange(index)}
        >
          {index + 1}
        </div>
      ) : (
        <div
          onClick={() => handlePageChange(index)}
        >
          {index + 1}
        </div>
      )}
    </>
  );
};
const Pagination = ({ setNumber, total, page }) => {
  const handlePageChange = (num) => {
    setNumber(num);
    // console.log(num);
  };
  // console.log("page", page);
  return (
    <div className="paginationButton">
      {[...Array(parseInt(1 + (total - 1) / 10))].map((e, i) => (
        <PageNum
          index={i}
          handlePageChange={handlePageChange}
          thisPage={page}
        />
      ))}
    </div>
  );
};

export default Pagination;
