import { IAppInputProps } from "../AppInput";

export interface IAppInputTime extends IAppInputProps {
  format?: string;
  formatter?: string;
  onChangeTime?: (value?: number) => void;
  minMaxHour?: [number | null, number | null];
  minMaxMinute?: [number | null, number | null];
  minMaxSecond?: [number | null, number | null];
  minMaxMillisecond?: [number | null, number | null];
  value?: string;
}
