import React, { useCallback, useState } from "react";
import { AppButton } from "../AppButton";
import { IAppButtonIconProps } from "./AppButtonIcon.types";
import clsx from "clsx";
import styles from "./AppButtonIcon.module.css";

export const AppButtonIcon = ({
  icon: Icon,
  iconProps,
  children,
  shape = "rectangle",
  direction = "horizontal",
  className,
  iconOnly = false,
  variant,
  onMouseEnter,
  onMouseLeave,
  ...props
}: IAppButtonIconProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const _onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(e);
      setIsHover(true);
    },
    [onMouseEnter],
  );

  const _onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      setIsHover(false);
    },
    [onMouseLeave],
  );

  return (
    <AppButton
      className={clsx(className, {
        [styles.square]: shape === "square",
        [styles.iconOnly]: iconOnly,
      })}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
      variant={iconOnly ? "transparent" : variant}
      {...props}
    >
      <div
        className={clsx("d-flex align-items-center justify-content-center", {
          [styles.vertical]: direction === "vertical",
        })}
      >
        <Icon
          stroke={isHover && iconOnly ? "#84c0ca" : undefined}
          {...iconProps}
        />
        {children ? <span className="ms-1">{children}</span> : null}
      </div>
    </AppButton>
  );
};
