import React from "react";

const Footer = () => {
  return (
    <div className="bg-purple-800/40 w-full fixed bottom-0">
      <div className="logo font-bold text-2xl flex items-center justify-center">
        <span className="text-purple-900">&lt;</span>
        <span className="text-white">Key</span>
        <span className="text-purple-900">Pouch/&gt;</span>
      </div>
      <div className="flex items-center justify-center">
        Created With
        <span>
          <lord-icon
            src="https://cdn.lordicon.com/gbkitytd.json"
            trigger="hover"
            colors="primary:#e83a30"
          ></lord-icon>
        </span>
        by Anshu Kumar
      </div>
    </div>
  );
};

export default Footer;
