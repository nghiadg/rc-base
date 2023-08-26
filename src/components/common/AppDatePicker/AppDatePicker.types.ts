import { CalendarProps } from "react-calendar";
import { IAppInputProps } from "../AppInput/AppInput.types";

export interface IAppDatePickerProps extends IAppInputProps {
  format?: string;
  /**
   * @param `formatter` Format to detect input value
   * @example DDMMYYYY and enter 22121997 to input. 22 for DD, 12 for MM and 1997 for YYYY
   */
  value?: number;
  formatter?: string;
  hasCalendar?: boolean;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  onChangeDate?: (value?: number) => void;
  minMaxYear?: [number | null, number | null];
  minMaxMonth?: [number | null, number | null];
  minMaxDate?: [number | null, number | null];
  calendarProps?: CalendarProps;
}
