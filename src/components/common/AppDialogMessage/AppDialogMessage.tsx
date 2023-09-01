import React, { useMemo } from "react";
import { useDialogMessageState } from "./AppDialogMessage.core";
import { Modal } from "react-bootstrap";
import { AppButton } from "../AppButton";
import styles from "./AppDialogMessage.module.css";
import { IAppDialogMessageProps } from "./AppDialogMessage.types";
import { nanoid } from "nanoid";
import { DialogMessageType } from "./AppDialogMessage.const";
import { IconError, IconInfo, IconWarning } from "../../icons";
import { IconWrapper } from "../IconWrapper";

export const AppDialogMessageQueue = () => {
  const dialogMessages = useDialogMessageState();

  const dialogs = useMemo(
    () => dialogMessages.sort((prev, next) => prev.time - next.time),
    [dialogMessages]
  );

  return (
    <>
      {dialogs.map((dialog) => (
        <AppDialogMessage key={dialog.id} {...dialog.props} />
      ))}
    </>
  );
};

const AppDialogMessage = ({
  footerButtons,
  children,
  title,
  type,
  ...props
}: IAppDialogMessageProps) => {
  const dialogTitle = useMemo(() => {
    if (!!title?.trim()) return title;
    switch (type) {
      case DialogMessageType.Info:
        return "Info";
      case DialogMessageType.Warning:
        return "Warning";
      case DialogMessageType.Error:
        return "Error";
      default:
        return "Info";
    }
  }, [title, type]);

  const dialogIcon = useMemo(() => {
    switch (type) {
      case DialogMessageType.Info:
        return IconInfo;
      case DialogMessageType.Warning:
        return IconWarning;
      case DialogMessageType.Error:
        return IconError;
      default:
        return IconInfo;
    }
  }, [type]);

  return (
    <Modal backdrop="static" show={true} centered {...props}>
      <Modal.Header>{dialogTitle}</Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2">
          {type !== DialogMessageType.None && (
            <IconWrapper as={dialogIcon} iconSize={40} />
          )}
          {children}
        </div>
      </Modal.Body>
      {footerButtons && footerButtons.length > 0 ? (
        <Modal.Footer className={styles.footer}>
          {footerButtons.map((button) => (
            <AppButton key={nanoid()} onClick={button.onClick}>
              {button.type}
            </AppButton>
          ))}
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};
