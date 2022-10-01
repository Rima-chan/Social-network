import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-b-4 rounded-full border-red-500"
        role="status"
      >
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  );
};

export default Loader;
