import { nanoid } from "nanoid";
import { useSyncExternalStore } from "react";
import { ModalActionType } from "./AppModal.const";
import {
  AppModalAction,
  IAppModal,
  IAppModalImplProps,
  IAppModalResult,
  TAppModalParams,
} from "./AppModal.types";

export class AppModalStore {
  public listeners: Array<(data: IAppModal[]) => void> = [];
  public modals: IAppModal[] = [];

  private reducer(action: AppModalAction) {
    switch (action.type) {
      case ModalActionType.Add: {
        this.modals = [...this.modals, action.payload];
        break;
      }
      case ModalActionType.Dismiss: {
        this.modals = this.modals.filter(
          (dialog) => dialog.id !== action.payload,
        );
        break;
      }
      case ModalActionType.Clear: {
        this.modals = [];
      }
    }
  }

  private dispatch(action: AppModalAction) {
    this.reducer(action);
    this.listeners.forEach((listener) => {
      listener(this.modals);
    });
  }

  subscribe(listener: (data: IAppModal[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getSnapshot() {
    return this.modals;
  }

  show(props: IAppModalImplProps, id: string) {
    this.dispatch({
      type: ModalActionType.Add,
      payload: {
        id,
        props,
        time: Date.now(),
      },
    });
  }

  hide(id: string) {
    this.dispatch({
      type: ModalActionType.Dismiss,
      payload: id,
    });
  }

  clear() {
    this.dispatch({
      type: ModalActionType.Clear,
    });
  }

  isDuplicate(id: string) {
    return this.modals.some((dialog) => dialog.id === id);
  }
}

const modalStore = new AppModalStore();

export const useModalState = () =>
  useSyncExternalStore(
    modalStore.subscribe.bind(modalStore),
    modalStore.getSnapshot.bind(modalStore),
  );

export class AppModal<TData> {
  private _id: string;
  private _params: TAppModalParams<TData>;
  public result: IAppModalResult<TData> = {
    button: "close",
    data: null,
  };
  _store: AppModalStore = modalStore;

  constructor(params: TAppModalParams<TData>) {
    this._params = params;
    this._id = params.id ?? nanoid();
    return this.show() as any;
  }

  static clear() {
    modalStore.clear();
  }

  static hide(id: string) {
    modalStore.hide(id);
  }

  async show() {
    if (modalStore.isDuplicate(this._id)) return this;
    this.result = await new Promise<IAppModalResult<TData>>((resolve) => {
      const { children, props } = this._params;
      this._store.show(
        {
          children,
          ...props,
          onHide: () => {
            modalStore.hide(this._id);
            props?.onHide?.();
            resolve({
              button: "close",
              data: null,
            });
          },
          onClose: (data) => {
            modalStore.hide(this._id);
            resolve(data);
          },
        },
        this._id,
      );
    });

    return this;
  }
}
