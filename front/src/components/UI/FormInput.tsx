import React, { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  error?: string;
  onChange: ({ value, key }: { value: string; key: string }) => void;
};

const FormInput: React.FC<Props> = ({ label, error, onChange, ...props }) => {
  return (
    <div className="mb-5">
      <label htmlFor={props.name}>{label}</label>
      <input
        {...props}
        id={props.name}
        onChange={(e) => {
          onChange({ value: e.target.value, key: e.target.name });
        }}
        // onBlur={handleActive}
        // onFocus={() =>
        //   inputsProps.name === "confirmPassword" && setActived(true)
        // }
        // actived={actived.toString()}
        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 mb-1 text-gray-700 focus:outline-none focus:shadow-outline"
      />
      {error && <span className="text-red-500 text-sm hidden">{error}</span>}
    </div>
  );
};

export default FormInput;
