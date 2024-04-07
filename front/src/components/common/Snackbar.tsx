import React from "react";
import { useSnackbar } from "../../utils/context/snackbar";

export type SnackbarProps = {
  type: "error" | "success";
  message?: string;
};

type Props = {
  snackbar: SnackbarProps | null;
};

const Snackbar: React.FC<Props> = ({ snackbar }) => {
  const { showSnackbar } = useSnackbar();
  if (!snackbar) return null;

  const { type, message } = snackbar;
  return (
    <div
      id="toast-default"
      className={`absolute right-10 bottom-5 flex items-center justify-center p-2 rounded-md shadow-md  ${
        type === "error" ? "bg-red-300" : "bg-green-300"
      } text-wight`}
    >
      <div className="mx-3 text-sm font-normal">
        {message || "Oups il y a eu un prolbème..."}
      </div>
      <button
        type="button"
        className=" text-gray-400 "
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => showSnackbar(null)}
      >
        <i className="fa-solid fa-xmark fa-lg text-end text-gray-600 cursor-pointer"></i>
      </button>
    </div>
  );
};

export default Snackbar;
