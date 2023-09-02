import clsx from "clsx";
import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import styles from "./AppInputNumber.module.css";
import { IAppInputNumber } from "./AppInputNumber.types";

export const AppInputNumber = forwardRef<HTMLInputElement, IAppInputNumber>(
  ({ error, errorMessage, width, ...props }, ref) => {
    return (
      <>
        <NumericFormat
          getInputRef={ref}
          className={clsx(
            "rounded-0 form-control form-control-sm",
            styles.input,
            {
              [styles.error]: error,
              [styles.widthXs]: width === "xs",
              [styles.widthSm]: width === "sm",
              [styles.widthLg]: width === "lg",
            },
          )}
          {...props}
        />
        {error && errorMessage ? (
          <span className={styles.errorMsg}>{errorMessage}</span>
        ) : null}
      </>
    );
  },
);
