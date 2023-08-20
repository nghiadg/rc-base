import { FormControlProps } from "react-bootstrap";

export interface IAppInputSearchProps extends FormControlProps {
    onSearch?: () => void;
}