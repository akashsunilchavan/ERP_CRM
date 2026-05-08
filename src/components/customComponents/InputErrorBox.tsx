import React from "react";

const InputErrorBox = (props: { Message: string }) => {
  return (
    <>
      {" "}
      <div className="fv-plugins-message-container">
        <div className="fv-help-block">
          <span role="alert" className="text-danger">
            {props.Message}
          </span>
        </div>
      </div>
    </>
  );
};
export default InputErrorBox;
