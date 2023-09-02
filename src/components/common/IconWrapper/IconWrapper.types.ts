import { FC } from "react";
import { IIconProps } from "../../icons";

export type IconSize = "xs" | "sm" | "lg" | "xl";

export interface IIconWrapperProps
  extends Omit<IIconProps, "size">,
    React.HTMLAttributes<HTMLSpanElement> {
  as: FC<IIconProps>;
  size?: IconSize;
  iconSize?: number;
  className?: string;
}
