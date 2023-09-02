import { useCallback } from "react";
import Select, {
  CSSObjectWithLabel,
  ControlProps,
  MenuProps,
  NoticeProps,
  OptionProps,
  ValueContainerProps,
  components,
} from "react-select";
import { IconDown } from "../../icons";
import { IconWrapper } from "../IconWrapper";
import styles from "./AppSelect.module.css";
import { IAppSelectProps } from "./AppSelect.types";

export const AppSelect = ({
  className,
  placeholder = "",
  error,
  errorMessage,
  ...props
}: IAppSelectProps) => {
  const controlStyles = useCallback(
    (baseStyles: CSSObjectWithLabel, state: ControlProps) => ({
      ...baseStyles,
      minHeight: 31,
      borderRadius: 0,
      boxShadow: "none",
      ...(state.isFocused && { borderColor: "var(--primary)" }),
      ...(error && { borderColor: "var(--red)" }),
      "&:hover": {
        ...(!error && { borderColor: "var(--primary)" }),
      },
    }),
    [error],
  );

  const valueContainerStyles = useCallback(
    (baseStyles: CSSObjectWithLabel, state: ValueContainerProps) => ({
      ...baseStyles,
      margin: 0,
      padding: "0 6px",
      fontSize: 14,
    }),
    [],
  );

  const menuStyles = useCallback(
    (baseStyles: CSSObjectWithLabel, state: MenuProps) => ({
      ...baseStyles,
      borderRadius: 0,
      margin: 0,
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      border: "1px solid var(--secondary-hover)",
    }),
    [],
  );

  const optionStyles = useCallback(
    (baseStyles: CSSObjectWithLabel, state: OptionProps) => ({
      ...baseStyles,
      height: 31,
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      ...(state.isSelected && { backgroundColor: "var(--primary)" }),
      ...(state.isFocused &&
        !state.isSelected && { backgroundColor: "var(--primary-light)" }),
      "&:active": {
        backgroundColor: state.isSelected
          ? "var(--primary)"
          : "var(--primary-light)",
      },
    }),
    [],
  );

  return (
    <>
      <Select
        styles={{
          control: controlStyles,
          valueContainer: valueContainerStyles,
          menu: menuStyles,
          option: optionStyles,
        }}
        components={{
          DropdownIndicator: DropdownIndicator,
          IndicatorSeparator: null,
          NoOptionsMessage: NoOptionMessage,
        }}
        placeholder={placeholder}
        {...props}
      />
      {error && errorMessage ? (
        <span className={styles.errorMsg}>{errorMessage}</span>
      ) : null}
    </>
  );
};

const DropdownIndicator = () => {
  return <IconWrapper as={IconDown} />;
};

const NoOptionMessage = (props: NoticeProps) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span></span>
    </components.NoOptionsMessage>
  );
};
