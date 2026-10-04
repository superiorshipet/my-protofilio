import React from "react";

export default function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[300px] w-full py-12">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}