import React from "react";

const ContentBlockItem = ({ className, children }) => {
   
  return (
    <React.Fragment>
      <div className={className + "-item"}>
        {children}
      </div>
    </React.Fragment>
  );
};

export default ContentBlockItem;