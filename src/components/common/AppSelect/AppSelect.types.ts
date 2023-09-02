import { Props } from "react-select";

export interface IAppSelectProps extends Props {
  error?: boolean;
  errorMessage?: string;
}

export interface IAppOption<T> {
  value: T;
  label: string;
}
