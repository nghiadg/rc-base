import clsx from "clsx";
import React from "react";
import styles from "./AppVersion.module.css";
import { IAppVersionProps } from "./AppVersion.types";

export const AppVersion = ({
  title = "Version",
  version,
}: IAppVersionProps) => {
  return (
    <div className={clsx("position-fixed bottom-0 end-0", styles.version)}>
      {title}: {version}
    </div>
  );
};
