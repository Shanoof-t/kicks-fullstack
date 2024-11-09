import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-gray-800">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <h1 className="text-3xl font-semibold">Loading...</h1>
    </div>
  );
}

export default Loading;
