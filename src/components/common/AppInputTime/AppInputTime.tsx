import React, {
  useCallback,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AppInput } from "../AppInput";
import { IAppInputTime } from "./AppInputTime.types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { KEY_CODE } from "../../../constants";

dayjs.extend(customParseFormat);
/**
 * @example 2300 -> 23:00
 */
export const AppInputTime = forwardRef<HTMLInputElement, IAppInputTime>(
  (
    {
      format = "HH:mm",
      formatter = "HHmm",
      onChangeTime,
      onKeyDown,
      minMaxHour,
      minMaxMinute,
      minMaxSecond,
      minMaxMillisecond,
      value,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const _value = useMemo(() => {
      if (value && dayjs(value, formatter, true).isValid()) {
        return dayjs(value, formatter, true).format(format);
      }
    }, [format, formatter, value]);

    const isValidHour = useCallback(
      (hour: number) => {
        let isValid = true;
        if (!minMaxSecond) return isValid;
        if (isValid && minMaxSecond[0]) {
          isValid = hour >= minMaxSecond[0];
        }
        if (isValid && minMaxSecond[1]) {
          isValid = hour <= minMaxSecond[1];
        }
        return isValid;
      },
      [minMaxSecond],
    );

    const isValidMinute = useCallback(
      (minute: number) => {
        let isValid = true;
        if (!minMaxSecond) return isValid;
        if (isValid && minMaxSecond[0]) {
          isValid = minute >= minMaxSecond[0];
        }
        if (isValid && minMaxSecond[1]) {
          isValid = minute <= minMaxSecond[1];
        }
        return isValid;
      },
      [minMaxSecond],
    );

    const isValidSecond = useCallback(
      (second: number) => {
        let isValid = true;
        if (!minMaxSecond) return isValid;
        if (isValid && minMaxSecond[0]) {
          isValid = second >= minMaxSecond[0];
        }
        if (isValid && minMaxSecond[1]) {
          isValid = second <= minMaxSecond[1];
        }
        return isValid;
      },
      [minMaxSecond],
    );

    const isValidMillisecond = useCallback(
      (millisecond: number) => {
        let isValid = true;
        if (!minMaxMillisecond) return isValid;
        if (isValid && minMaxMillisecond[0]) {
          isValid = millisecond >= minMaxMillisecond[0];
        }
        if (isValid && minMaxMillisecond[1]) {
          isValid = millisecond <= minMaxMillisecond[1];
        }
        return isValid;
      },
      [minMaxMillisecond],
    );

    const _onChangeTime = useCallback(
      (value: string) => {
        if (!inputRef.current) return;
        const timeInstance = dayjs(value, formatter, true);
        const formattedInstance = dayjs(value, format, true);
        if (
          timeInstance.isValid() &&
          isValidHour(timeInstance.hour()) &&
          isValidMinute(timeInstance.minute()) &&
          isValidSecond(timeInstance.second()) &&
          isValidMillisecond(timeInstance.millisecond())
        ) {
          const timeValue = timeInstance.format(format);
          inputRef.current.value = timeValue;
          onChangeTime?.(Number(value));
        } else if (
          formattedInstance.isValid() &&
          isValidHour(formattedInstance.hour()) &&
          isValidMinute(formattedInstance.minute()) &&
          isValidSecond(formattedInstance.second()) &&
          isValidMillisecond(formattedInstance.millisecond())
        ) {
          inputRef.current.value = value;
          onChangeTime?.(Number(value));
        } else {
          inputRef.current.value = "";
          onChangeTime?.();
        }
      },
      [
        format,
        formatter,
        isValidHour,
        isValidMillisecond,
        isValidMinute,
        isValidSecond,
        onChangeTime,
      ],
    );

    const _onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KEY_CODE.Enter && inputRef.current) {
          _onChangeTime(inputRef.current.value);
        }
        onKeyDown?.(e);
      },
      [_onChangeTime, onKeyDown],
    );

    useImperativeHandle(ref, () => Object.assign(inputRef));

    return (
      <AppInput
        ref={inputRef}
        onKeyDown={_onKeyDown}
        value={_value}
        {...props}
      />
    );
  },
);
