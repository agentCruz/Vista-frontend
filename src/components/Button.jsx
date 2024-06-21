import React from "react";

export default function Button(props) {
  return (
    <div>
      <button
        onClick={props.onClick}
        className={`capitalize font-medium  w-full py-[14px] rounded-[8px]
    ${
      props.disabled
        ? "bg-[#9CADE933] text-[#7856FF] opacity-40"
        : "text-white bg-[#7856FF]"
    }
    `}
      >
        {props.text}
      </button>
    </div>
  );
}
