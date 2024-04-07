import React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  enableEdit?: boolean;
  onFileChange?: (file: File | null) => void;
};

const DisplayAvatar: React.FC<Props> = ({
  alt,
  src,
  className,
  enableEdit,
  onFileChange,
}) => {
  return (
    <div
      className={`flex-0  ${className} ${
        enableEdit ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {enableEdit ? (
        <label className="cursor-pointer">
          <input
            type="file"
            name="avatar"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (onFileChange) onFileChange(file);
            }}
          />
          <img
            src={src}
            alt={alt}
            className="rounded-full object-cover aspect-square"
          />
        </label>
      ) : (
        <img
          src={src}
          alt={alt}
          className="rounded-full object-cover aspect-square"
        />
      )}
    </div>
  );
};

export default DisplayAvatar;
