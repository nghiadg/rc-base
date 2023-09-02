import { ModalActionType } from "./AppModal.const";
import { ModalProps } from "react-bootstrap";

export type ModalButtonType = "close";

export interface IAppModalCloseHandler<
  TData extends any = any,
  ButtonType extends ModalButtonType = ModalButtonType,
> {
  onClose?: (data: IAppModalResult<TData, ButtonType>) => void;
}

export interface IAppModalProps<TData>
  extends ModalProps,
    IAppModalCloseHandler<TData> {}

export type IAppModalImplProps<
  TData extends any = any,
  ButtonType extends ModalButtonType = ModalButtonType,
> = IAppModalCloseHandler<TData, ButtonType> & ModalProps;

export interface IAppModalStore<
  IListener extends Array<(data: IAppModal[]) => void> = Array<
    (data: IAppModal[]) => void
  >,
  IModals extends IAppModal[] = IAppModal[],
> {
  listeners: IListener;
  modals: IModals;
}

export interface IAppModalHandler<
  AppModalProps extends IAppModalImplProps = IAppModalImplProps,
> {
  show: (props: AppModalProps, id: string) => void;
  hide: (id: string) => void;
  isDuplicate: (id: string) => boolean;
}
export interface IAppModal {
  props: IAppModalImplProps;
  id: string;
  time: number;
}

type ActionAdd = {
  type: ModalActionType.Add;
  payload: IAppModal;
};

type ActionDismiss = {
  type: ModalActionType.Dismiss;
  payload: string;
};

type ActionClear = {
  type: ModalActionType.Clear;
};

export type AppModalAction = ActionAdd | ActionDismiss | ActionClear;

export interface IAppModalResult<
  TData extends any = any,
  ButtonType extends ModalButtonType = ModalButtonType,
> {
  button: ButtonType | (string & { _?: never });
  data?: TData | null;
}

export type TAppModalParams<TComponent> = {
  children: TComponent;
  props?: (TComponent extends (...args: any[]) => any
    ? Parameters<TComponent>[0]
    : never) &
    ModalProps;
  id?: string;
};

export type TAppModalResult<TComponent> = IAppModalResult<
  TComponent extends (...args: any[]) => any
    ? Parameters<TComponent>[0] extends IAppModalCloseHandler
      ? Parameters<
          Parameters<TComponent>[0]["onClose"]
        >[0] extends IAppModalResult
        ? Parameters<Parameters<TComponent>[0]["onClose"]>[0]["data"]
        : never
      : never
    : never
>;
