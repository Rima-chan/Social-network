import React from "react";

const Alert = (props) => {
  return (
    <>
      <div
        className={`block text-sm text-left ${props.classes} bg-opacity-10 font-semibold h-auto flex items-center rounded-md p-4 my-3 border`}
        role="alert"
      >
        {/* <i className={`${props.icon} pr-3`}></i> */}
        {props.content}
      </div>
    </>
  );
};

export default Alert;
