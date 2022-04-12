import React from "react";

const PageNum = ({ index, handlePageChange, thisPage }) => {
  console.log(thisPage);
  return (
    <>
      {thisPage === index ? (
        <button
          onClick={() => handlePageChange(index)}
          style={{ cursor: "pointer", width: "10px", backgroundColor: "red" }}
        >
          {index + 1}
        </button>
      ) : (
        <button
          onClick={() => handlePageChange(index)}
          style={{ cursor: "pointer", width: "10px" }}
        >
          {index + 1}
        </button>
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
  const style = {
    display: "flex",
    gap: "10px",
  };
  return (
    <div style={style}>
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
