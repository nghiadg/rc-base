import { StringUtils } from "../../../utils";
import {
  DialogMessageActionType,
  DialogMessageButton,
  DialogMessage,
} from "./AppDialogMessage.const";
import {
  AppDialogMessageAction,
  IAppDialogMessage,
  IAppDialogMessageProps,
  IDialogMessageResult,
} from "./AppDialogMessage.types";
import { useSyncExternalStore } from "react";
import { nanoid } from "nanoid";
import { ModalProps } from "react-bootstrap";

export class AppDialogMessageStore {
  private listeners: Array<(data: IAppDialogMessage[]) => void> = [];
  public dialogs: IAppDialogMessage[] = [];

  private reducer(action: AppDialogMessageAction) {
    switch (action.type) {
      case DialogMessageActionType.Add: {
        this.dialogs = [...this.dialogs, action.payload];
        break;
      }
      case DialogMessageActionType.Dismiss: {
        this.dialogs = this.dialogs.filter(
          (dialog) => dialog.id !== action.payload,
        );
        break;
      }
      case DialogMessageActionType.Clear: {
        this.dialogs = [];
      }
    }
  }

  private dispatch(action: AppDialogMessageAction) {
    this.reducer(action);
    this.listeners.forEach((listener) => {
      listener(this.dialogs);
    });
  }

  subscribe(listener: (data: IAppDialogMessage[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getSnapshot() {
    return this.dialogs;
  }

  show(props: IAppDialogMessageProps, id: string) {
    this.dispatch({
      type: DialogMessageActionType.Add,
      payload: {
        id,
        props,
        time: Date.now(),
      },
    });
  }

  hide(id: string) {
    this.dispatch({
      type: DialogMessageActionType.Dismiss,
      payload: id,
    });
  }

  clear() {
    this.dispatch({
      type: DialogMessageActionType.Clear,
    });
  }

  isDuplicate(id: string) {
    return this.dialogs.some((dialog) => dialog.id === id);
  }
}

const dialogStore = new AppDialogMessageStore();

export const useDialogMessageState = () =>
  useSyncExternalStore(
    dialogStore.subscribe.bind(dialogStore),
    dialogStore.getSnapshot.bind(dialogStore),
  );

export class AppDialogMessage {
  private _title: string;
  private _dialogMessage: DialogMessage;
  private _buttons: DialogMessageButton[];
  private _id: string;
  private _modalProps: Partial<ModalProps>;
  public result: IDialogMessageResult<DialogMessageButton> = {
    button: DialogMessageButton.mbClose,
  };

  constructor(
    message: DialogMessage,
    params: string | string[],
    buttons: DialogMessageButton | DialogMessageButton[],
    title: string = "",
    modalProps: Partial<ModalProps> = {},
  ) {
    this._id = nanoid();
    this._title = title;
    this._dialogMessage = new DialogMessage(
      message._type,
      StringUtils.format(
        message._message,
        ...(Array.isArray(params) ? params : [params]),
      ),
    );

    this._buttons = Array.isArray(buttons) ? buttons : [buttons];
    this._modalProps = modalProps;
    return this.show() as any;
  }

  static clear() {
    dialogStore.clear();
  }

  static hide(id: string) {
    dialogStore.hide(id);
  }

  async show() {
    if (dialogStore.isDuplicate(this._id)) return this;
    this.result = await new Promise<IDialogMessageResult<DialogMessageButton>>(
      (resolve) => {
        dialogStore.show(
          {
            children: (
              <>
                <span>{this._dialogMessage._message}</span>
              </>
            ),
            onHide() {
              dialogStore.hide(this._id);
            },
            title: this._title,
            footerButtons: this._buttons.map((button) => ({
              type: button,
              onClick: (e) => {
                resolve({
                  button,
                });
                dialogStore.hide(this._id);
              },
            })),
            type: this._dialogMessage._type,
            ...this._modalProps,
          },
          this._id,
        );
      },
    );

    return this;
  }
}
