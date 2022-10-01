import React, { useState } from "react";

const FormInput = (props) => {
  const [actived, setActived] = useState(false);
  const { label, errorMessage, onChange, id, ...inputsProps } = props;
  const handleActive = (e) => {
    setActived(true);
  };
  return (
    <div className="mb-5">
      <label htmlFor={id}>{label}</label>
      <input
        {...inputsProps}
        id={id}
        onChange={onChange}
        onBlur={handleActive}
        onFocus={() =>
          inputsProps.name === "confirmPassword" && setActived(true)
        }
        actived={actived.toString()}
        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 mb-1 text-gray-700 focus:outline-none focus:shadow-outline"
      />
      <span className="text-red-500 text-sm hidden">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
