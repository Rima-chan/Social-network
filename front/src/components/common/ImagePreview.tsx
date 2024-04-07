import React from "react";

type Props = {
  imageURL: string | null;
  setImageURL: (value: string) => void;
  onCallback: () => void;
};

const ImagePreview: React.FC<Props> = ({
  setImageURL,
  imageURL,
  onCallback,
}) => {
  return (
    <>
      {imageURL ? (
        <span className="flex flex-col pb-2 mt-3">
          <button
            className="self-end"
            onClick={() => {
              setImageURL("");
              onCallback();
            }}
          >
            <i className="fa-solid fa-xmark fa-lg text-end text-gray-600 cursor-pointer"></i>
          </button>
          <img
            src={imageURL}
            alt="preview"
            className="object-cover self-center max-w-xs"
          />
        </span>
      ) : null}
    </>
  );
};

export default ImagePreview;
