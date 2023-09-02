import { NumericFormatProps } from "react-number-format";

export type AppInputNumberWidth = "xs" | "sm" | "lg" | "full";

export interface IAppInputNumber extends NumericFormatProps {
  error?: boolean;
  errorMessage?: string;
  width?: AppInputNumberWidth;
}
