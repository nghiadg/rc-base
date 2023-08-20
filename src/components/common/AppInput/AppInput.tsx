import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";
import styles from "./AppInput.module.css";
import clsx from "clsx";
import { IAppInputProps } from "./AppInput.types";

export const AppInput = forwardRef<HTMLInputElement, IAppInputProps>(
  ({ size = "sm", className, error = false, errorMessage, ...props }, ref) => {
    return (
      <>
        <Form.Control
          ref={ref}
          className={clsx("rounded-0", styles.input, className, {
            [styles.error]: error,
          })}
          size={size}
          {...props}
        />
        {error && errorMessage ? (
          <span className={styles.errorMsg}>{errorMessage}</span>
        ) : null}
      </>
    );
  }
);
