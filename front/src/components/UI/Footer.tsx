import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4">
      <div className="flex flex-col items-center">
        <a
          href="https://github.com/Rima-chan?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-2x fa-github"></i>
        </a>
        <p className="italic pt-2 pb-3">2021 | Marie Beaujeu</p>
      </div>
    </footer>
  );
};

export default Footer;
