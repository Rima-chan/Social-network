import React from "react";

type Props = {
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
};

const SendButtons: React.FC<Props> = ({ onFileChange, onSubmit }) => {
  return (
    <form encType="multipart/form-data" method="POST">
      <div className="flex justify-end mt-2 gap-4">
        <label className="cursor-pointer">
          <input
            type="file"
            name="attachment"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              onFileChange(file);
            }}
          />
          <i className="fa-solid fa-image fa-lg text-purple-800"></i>
        </label>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <i className="fa-solid fa-paper-plane fa-lg text-purple-800"></i>
        </button>
      </div>
    </form>
  );
};

export default SendButtons;
