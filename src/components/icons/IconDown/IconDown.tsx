import React from "react";
import { IIconProps } from "../Icon.types";

export const IconDown = ({ width = 24, height = 24, stroke = '#605f5f', size }: IIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? width}
      height={size ?? height}
      viewBox="0 0 21 21"
    >
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.5 8.5l-4 4l-4-4"
      />
    </svg>
  );
};
