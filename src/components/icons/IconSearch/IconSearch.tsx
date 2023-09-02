import React from "react";
import { IIconProps } from "../Icon.types";

export const IconSearch = ({
  width = 24,
  height = 24,
  stroke = "#605f5f",
  size,
}: IIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 21"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8.5" cy="8.5" r="5" />
        <path d="M17.571 17.5L12 12" />
      </g>
    </svg>
  );
};
