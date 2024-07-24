import React from "react";

export default function Loader() {
  return (
    <div className="flex gap-2">
      <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
      <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
      <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
    </div>
  );
}