import { ButtonProps } from "react-bootstrap";
import { ReactNode } from "react";

export type AppButtonSize = "sm" | "lg" | "xs";

export interface IAppButtonProps extends Omit<ButtonProps, "size"> {
  children?: ReactNode;
  size?: AppButtonSize;
}
