import React from "react";

export default function ModalLayout({ children, modalState, maxWidth }) {
  return (
    <div
      className={`bg-[#0000005d] w-full fixed top-0 left-0 z-[1000] h-screen grid grid-cols-1 mobile-sm:grid-cols-3 ${
        modalState
          ? "pointer-events-auto opacity-1 transition-all"
          : "pointer-events-none opacity-0 transition-all"
      }`}
    >
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div
        className={`bg-white w-[100%] col-span-1 p-10 ${
          modalState
            ? "transform translate-x-0 transition-all"
            : "transform translate-x-[8%] transition-all"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
