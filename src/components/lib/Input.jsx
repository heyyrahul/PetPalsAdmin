import React from "react";

const Input = ({ place, className, type, ...props }) => {
  return (
    <div>
      <input {...props} required className={`${className}`} type={`${type}`} placeholder={`${place}`} />
    </div>
  );
};

export default Input;
