import React from "react";
import { IIconProps } from "../Icon.types";

export const IconChecked = ({ width = 24, height = 24, stroke = '#605f5f', size }: IIconProps) => {
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
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m5.5 11.5l3 3l8.028-8"
      />
    </svg>
  );
};
