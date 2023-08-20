import { FC } from "react";
import { IIconProps } from "../../icons";

export type IconSize = "xs" | "sm" | "lg";

export interface IIconWrapperProps extends Omit<IIconProps, "size"> {
    as: FC<IIconProps>,
    size?: IconSize;
    iconSize?: number;
}