import React from "react";
import { Button } from "react-bootstrap";
import { IAppButtonProps } from "./AppButton.types";
import styles from "./AppButton.module.css";
import clsx from "clsx";

export const AppButton = ({
  variant = "primary",
  size = "sm",
  className,
  children,
  ...props
}: IAppButtonProps) => {
  return (
    <Button
      className={clsx("rounded-0", styles.btn, className, {
        [styles.transparent]: variant === "transparent",
        [styles.secondary]: variant === "secondary",
        [styles.light]: variant === "light",
        [styles.xs]: size === 'xs'
      })}
      size={size === "xs" ? undefined : size}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
};
