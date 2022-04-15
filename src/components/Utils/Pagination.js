import React from "react";
import "./Pagination.scss";

const PageNum = ({ index, handlePageChange, thisPage }) => {
  return (
    <>
      {thisPage === index ? (
        <div
          className="paginationButton__isSelected"
          onClick={() => handlePageChange(index)}
        >
          {index + 1}
        </div>
      ) : (
        <div
          className="paginationButton__isNotSelected"
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
  };
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
