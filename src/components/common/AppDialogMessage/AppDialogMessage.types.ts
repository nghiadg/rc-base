import { ModalProps } from "react-bootstrap";
import { ReactNode } from "react";
import {
  DialogMessageActionType,
  DialogMessageButton,
  DialogMessageType,
} from "./AppDialogMessage.const";

export interface IAppDialogMessageProps extends ModalProps {
  children: ReactNode;
  title?: string;
  footerButtons?: IFooterButtonDialogMessage[];
  type: DialogMessageType;
}

export interface IAppDialogMessage {
  id: string;
  time: number;
  props: IAppDialogMessageProps;
}

export type ActionAdd = {
  type: DialogMessageActionType.Add;
  payload: IAppDialogMessage;
};

export type ActionDismiss = {
  type: DialogMessageActionType.Dismiss;
  payload: string;
};

export type ActionClear = {
  type: DialogMessageActionType.Clear;
};

export type AppDialogMessageAction = ActionAdd | ActionDismiss | ActionClear;

export interface IFooterButtonDialogMessage {
  type: DialogMessageButton;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IResult<TButton> {
  resultButton: TButton;
}
