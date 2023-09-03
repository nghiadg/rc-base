import { NumericFormatProps } from "react-number-format";

export type AppInputNumberWidth = "xs" | "sm" | "lg" | "full";

export interface IAppInputNumber
  extends Omit<
    NumericFormatProps,
    "size" | "customInput" | "value" | "defaultValue"
  > {
  error?: boolean;
  errorMessage?: string;
  width?: AppInputNumberWidth;
  value?: number | string;
  defaultValue?: number | string;
}
