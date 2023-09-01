export enum DialogMessageActionType {
  Add,
  Dismiss,
  Clear,
}

export enum DialogMessageButton {
  mbYes = "Yes",
  mbNo = "No",
  mbOk = "OK",
  mbCancel = "Cancel",
  mbClose = "Close",
}

export enum DialogMessageType {
  Info,
  Warning,
  Error,
  None,
}

export class DialogMessage {
  public _type: DialogMessageType;
  public _message: string;

  constructor(type: DialogMessageType, message: string) {
    this._type = type;
    this._message = message;
  }

  static get Info() {
    return DialogMessageType.Info;
  }
  static get None() {
    return DialogMessageType.None;
  }
  static get Error() {
    return DialogMessageType.Error;
  }
  static get Warning() {
    return DialogMessageType.Warning;
  }
}
