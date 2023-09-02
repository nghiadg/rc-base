import React from "react";
import RCalendar from "react-calendar";
import { IAppCalendarProps } from "./AppCalendar.types";
import { Calendar } from "../../../constants";

export const AppCalendar = ({
  locale = Calendar.Locale,
  ...props
}: IAppCalendarProps) => {
  return <RCalendar locale={locale} showFixedNumberOfWeeks {...props} />;
};
