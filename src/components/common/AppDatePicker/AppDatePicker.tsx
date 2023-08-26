import { ControlledMenu } from "@szhsin/react-menu";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useCallback, useRef, useMemo } from "react";
import RCalendar from "react-calendar";
import { Calendar, KEY_CODE } from "../../../constants";
import { useOnClickOutside, useToggle } from "../../../hooks";
import { IconCalendar } from "../../icons";
import { AppInput } from "../AppInput";
import { IconWrapper } from "../IconWrapper";
import styles from "./AppDatePicker.module.css";
import { IAppDatePickerProps } from "./AppDatePicker.types";
import clsx from "clsx";
import { Value } from "react-calendar/dist/cjs/shared/types";

dayjs.extend(customParseFormat);

export const AppDatePicker = ({
  format = "DD/MM/YYYY",
  formatter = "DDMMYYYY",
  hasCalendar = true,
  inputRef,
  value,
  minMaxYear = [null, null],
  minMaxMonth = [null, null],
  minMaxDate = [null, null],
  onKeyDown,
  onChangeDate,
  onBlur,
  calendarProps,
  ...props
}: IAppDatePickerProps) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isOpenCalendar, toggleOpenCalendar] = useToggle(false);
  const _inputRef = useRef<HTMLInputElement | null>(null);
  const _calendarRef = useRef<HTMLDivElement | null>(null);

  const _value = useMemo(() => {
    if (value && dayjs(value, formatter, true).isValid()) {
      return dayjs(value, formatter, true).format(format);
    }
  }, [format, formatter, value]);

  const isValidYear = useCallback(
    (year: number) => {
      let isValid = true;
      if (!minMaxYear) return isValid;
      if (isValid && minMaxYear[0]) {
        isValid = year >= minMaxYear[0];
      }
      if (isValid && minMaxYear[1]) {
        isValid = year <= minMaxYear[1];
      }
      return isValid;
    },
    [minMaxYear]
  );

  const isValidMonth = useCallback(
    (month: number) => {
      let isValid = true;
      if (!minMaxYear) return isValid;
      if (isValid && minMaxYear[0]) {
        isValid = month >= minMaxYear[0];
      }
      if (isValid && minMaxYear[1]) {
        isValid = month <= minMaxYear[1];
      }
      return isValid;
    },
    [minMaxYear]
  );

  const isValidDate = useCallback(
    (date: number) => {
      let isValid = true;
      if (!minMaxDate) return isValid;
      if (isValid && minMaxDate[0]) {
        isValid = date >= minMaxDate[0];
      }
      if (isValid && minMaxDate[1]) {
        isValid = date <= minMaxDate[1];
      }
      return isValid;
    },
    [minMaxDate]
  );

  const _onChangeDate = useCallback(
    (value: string) => {
      if (!_inputRef.current) return;
      const dateInstance = dayjs(value, formatter, true);
      const anotherDateInstance = dayjs(value, format, true);
      if (
        dateInstance.isValid() &&
        isValidYear(dateInstance.year()) &&
        isValidMonth(dateInstance.month()) &&
        isValidDate(dateInstance.date())
      ) {
        const dateValue = dayjs(value, formatter, true).format(format);
        _inputRef.current.value = dateValue;
        onChangeDate?.(Number(value));
      } else if (anotherDateInstance.isValid()) {
        const dateValue = dayjs(value, format, true).format(format);
        _inputRef.current.value = dateValue;
        onChangeDate?.(Number(anotherDateInstance.format(formatter)));
      } else {
        _inputRef.current.value = "";
        onChangeDate?.();
      }
    },
    [formatter, isValidYear, isValidMonth, isValidDate, format, onChangeDate]
  );

  const _onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KEY_CODE.Enter && _inputRef.current) {
        _onChangeDate(_inputRef.current.value);
      }
      onKeyDown?.(e);
    },
    [_onChangeDate, onKeyDown]
  );

  const _onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      _inputRef.current && _onChangeDate(_inputRef.current?.value);
      onBlur?.(e);
    },
    [_onChangeDate, onBlur]
  );

  const onChangeCalendar = useCallback(
    (value: Value, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      _onChangeDate(dayjs(value as Date).format(formatter));
      toggleOpenCalendar();
    },
    [_onChangeDate, formatter, toggleOpenCalendar]
  );

  const setRef = useCallback(
    (ref: HTMLInputElement | null) => {
      _inputRef.current = ref;
      if (inputRef) {
        inputRef.current = ref;
      }
    },
    [inputRef]
  );

  useOnClickOutside(_calendarRef, () => {
    if (isOpenCalendar) {
      toggleOpenCalendar();
    }
  });

  return (
    <div ref={anchorRef}>
      <div className="position-relative">
        <AppInput
          ref={setRef}
          value={_value}
          onKeyDown={_onKeyDown}
          onBlur={_onBlur}
          {...props}
        />
        {hasCalendar ? (
          <IconWrapper
            as={IconCalendar}
            className="position-absolute top-50 end-0 translate-middle cursor-pointer"
            size="xs"
            onClick={toggleOpenCalendar}
          />
        ) : null}
      </div>
      {hasCalendar ? (
        <ControlledMenu
          anchorRef={anchorRef}
          state={isOpenCalendar ? "open" : "closed"}
          direction="bottom"
          align="start"
          className={styles.menu}
          portal
        >
          <RCalendar
            {...calendarProps}
            inputRef={_calendarRef}
            locale={Calendar.Locale}
            showFixedNumberOfWeeks
            className={clsx(styles.calendar, calendarProps?.className)}
            onChange={onChangeCalendar}
          />
        </ControlledMenu>
      ) : null}
    </div>
  );
};
