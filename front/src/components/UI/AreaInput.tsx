import React from "react";
import { ForwardedRef } from "react";

type Props = {
  value: string | undefined;
  onChange: (newValue: string) => void;
  rows?: number;
  className?: string;
  textAreaRef?: ForwardedRef<HTMLTextAreaElement>;
};

const AreaInput = ({
  rows = 5,
  value,
  className,
  onChange,
  textAreaRef,
}: Props) => {
  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder="Ecrivez quelque chose..."
      className={`w-full focus:outline-0 p-3 border-b-2 ${className || ""}`}
    />
  );
};

export default AreaInput;
