import { FormControlProps } from "react-bootstrap";

export type AppInputWidth = "xs" | "sm" | "lg" | "full";
export interface IAppInputProps extends FormControlProps {
  error?: boolean;
  errorMessage?: string;
  width?: AppInputWidth;
}
