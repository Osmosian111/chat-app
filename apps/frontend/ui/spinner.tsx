import React from "react";

const Spinner = () => {
  return (
    <div className="fixed flex justify-center items-center h-screen w-screen">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
