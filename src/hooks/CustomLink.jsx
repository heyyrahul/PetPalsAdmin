import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <>
      <Link
        className={
          match
            ? "pl-6 py-3 mx-5 text-center cursor-pointer mb-3 flex items-center transition-colors bg-[#F8FAFF] text-primary-900 rounded-[8px] shadow-[0_5px_10px_-5px_rgba(175,0,255,0.10)] font-medium"
            : "pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors text-gray-500 hover:bg-[#F8FAFF] hover:text-primary-600 font-medium"
        }
        to={to}
        {...props}
      >
        {children}
      </Link>
    </>
  );
}

export default CustomLink;
