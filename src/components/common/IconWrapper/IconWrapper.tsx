import React from "react";
import { IIconWrapperProps } from "./IconWrapper.types";
import styles from "./IconWrapper.module.css";
import clsx from "clsx";

export const IconWrapper = ({
  as: Svg,
  size = "sm",
  iconSize,
  className,
  ...props
}: IIconWrapperProps) => {
  return (
    <span
      className={clsx(styles.wrapper, className, {
        [styles.xs]: size === "xs",
        [styles.sm]: size === "sm",
        [styles.lg]: size === "lg",
        [styles.xl]: size === "xl",
      })}
      {...props}
    >
      <Svg size={iconSize} {...props} />
    </span>
  );
};
