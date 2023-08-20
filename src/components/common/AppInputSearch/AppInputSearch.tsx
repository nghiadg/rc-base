import { forwardRef } from "react";
import { IconSearch } from "../../icons";
import { AppButtonIcon } from "../AppButtonIcon";
import { AppInput } from "../AppInput/AppInput";
import { IAppInputSearchProps } from "./AppInputSearch.types";

export const AppInputSearch = forwardRef<
  HTMLInputElement,
  IAppInputSearchProps
>(({ onSearch, ...props }, ref) => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <AppInput ref={ref} {...props} />
      <AppButtonIcon icon={IconSearch} iconOnly onClick={onSearch} />
    </div>
  );
});
