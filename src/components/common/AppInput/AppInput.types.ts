import { FormControlProps } from "react-bootstrap";

export interface IAppInputProps extends FormControlProps {
    error?: boolean,
    errorMessage?: string;
}