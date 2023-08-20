import clsx from "clsx";
import { useCallback } from "react";
import Select, {
    ControlProps,
    DropdownIndicatorProps,
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
  const controlClassName = useCallback(
    (state: ControlProps) =>
      clsx("rounded-0", styles.select, {
        [styles.focus]: state.isFocused,
        [styles.error]: error,
      }),
    [error]
  );
  const indicatorsContainerClassName = useCallback(
    (state: DropdownIndicatorProps) => clsx("p-0"),
    []
  );
  const valueContainerClassName = useCallback(
    (state: ValueContainerProps) => clsx(styles.valueContainer),
    []
  );
  const menuClassName = useCallback(
    (state: MenuProps) => clsx("rounded-0 mt-0", styles.menu),
    []
  );

  const optionClassName = useCallback(
    (state: OptionProps) =>
      clsx(styles.option, {
        [styles.selected]: state.isSelected,
        [styles.focused]: !state.isSelected && state.isFocused,
        [styles.hovered]: !state.isSelected,
      }),
    []
  );

  return (
    <>
      <Select
        classNames={{
          control: controlClassName,
          valueContainer: valueContainerClassName,
          dropdownIndicator: indicatorsContainerClassName,
          menu: menuClassName,
          option: optionClassName,
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
