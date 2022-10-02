import React from "react";

const UserProfilLine = (props) => {
  return (
    <span className="flex justify-start items-center w-full ">
      {props.icon}
      <p className="ml-5">{props.title}</p>
    </span>
  );
};

export default UserProfilLine;
