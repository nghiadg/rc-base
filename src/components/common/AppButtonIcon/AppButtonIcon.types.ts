import { FC, ReactNode } from "react";
import { IAppButtonProps } from "../AppButton/AppButton.types";
import { IIconProps } from "../../icons";

export type AppButtonIconShape = "square" | "rectangle";
export type AppButtonIconDirection = "vertical" | "horizontal";

export interface IAppButtonIconProps extends IAppButtonProps {
  icon: FC<IIconProps>;
  iconProps?: IIconProps;
  shape?: AppButtonIconShape;
  direction?: AppButtonIconDirection;
  iconOnly?: boolean;
}
