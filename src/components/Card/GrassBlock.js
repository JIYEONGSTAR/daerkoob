import React from "react";

const GrassBlock = ({ d }) => {
  const Hover = ({ onHover, children }) => (
    <div className="hover">
      <div className="hover__no-hover">{children}</div>
      <div className="hover__hover">{onHover}</div>
    </div>
  );
  return (
    <>
      <Hover
        onHover={
          d.commit > 0 && (
            <div
              className="grass__wrapper__block"
              style={{
                width: "100px",
                height: "50px",
              }}
            >
              {d.date && (
                <div>
                  {d.date.slice(0, 10)}
                  <p>{d.commit}개</p>
                </div>
              )}
            </div>
          )
        }
      >
        {d.commit !== null && (
          <div
            className={"grass__wrapper__block " + d.direction}
            style={
              d.commit === 0
                ? {
                    backgroundColor: `#e1e2e1`,
                  }
                : d.commit < 10
                ? {
                    backgroundColor: `rgb(87,${255 - d.commit * 20},${
                      d.commit * 10
                    })`,
                  }
                : {
                    backgroundColor: `rgb(87,${255 - 100},${100})`,
                  }
            }
          ></div>
        )}
      </Hover>
    </>
  );
};

export default GrassBlock;
