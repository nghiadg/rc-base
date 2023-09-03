import clsx from "clsx";
import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import styles from "./AppInputNumber.module.css";
import { IAppInputNumber } from "./AppInputNumber.types";
import { FormControl } from "react-bootstrap";

export const AppInputNumber = forwardRef<HTMLInputElement, IAppInputNumber>(
  ({ error, errorMessage, width, className, ...props }, ref) => {
    return (
      <>
        <FormControl
          getInputRef={ref}
          size="sm"
          as={NumericFormat}
          className={clsx("rounded-0", styles.input, className, {
            [styles.error]: error,
            [styles.widthXs]: width === "xs",
            [styles.widthSm]: width === "sm",
            [styles.widthLg]: width === "lg",
          })}
          {...props}
        />
        {error && errorMessage ? (
          <span className={styles.errorMsg}>{errorMessage}</span>
        ) : null}
      </>
    );
  },
);
