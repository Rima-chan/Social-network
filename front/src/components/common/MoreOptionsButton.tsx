import React, { useRef } from "react";
import { useOutsideClick } from "../../utils/hooks";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
};

const MoreOptions: React.FC<Props> = ({ show, setShow, onEdit, onDelete }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setShow(false);
  });

  return (
    <>
      <button
        className="self-start px-3"
        data-popover-target="popover"
        onClick={() => setShow(!show)}
      >
        <i className="fa-solid fa-ellipsis-vertical text-gray-400"></i>
      </button>
      {show && (
        <div
          ref={ref}
          data-popover
          id="popover"
          className="absolute z-20 -right-20 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 inline-block"
          onBlur={() => setShow(false)}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={onEdit}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Modifier
            </button>
            <button
              onClick={onDelete}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MoreOptions;
