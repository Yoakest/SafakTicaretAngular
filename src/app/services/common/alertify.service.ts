import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
declare var alertify: any


@Injectable({
  providedIn: 'root'
})


export class AlertifyService {

  constructor() { }

  message(
    message: string, 
    options: Partial<AlertyfyOptions> = {}
  ) {
    const {
      messageType = MessageType.Error,
      messagePosition = MessagePosition.TopCenter,
      delay = 3,
      dismissOther = false
    } = options;
    
    
    alertify.set('notifier', 'delay', delay);
    alertify.set("notifier", "position", messagePosition);
    alertify[messageType](message);
    if (dismissOther) {
      alertify[messageType](message).dismissOther();
    }
  }
}


export class AlertyfyOptions {
  messageType?: MessageType;
  messagePosition?: MessagePosition;
  delay?: number;
  dismissOther?: boolean;
}


export enum MessageType {
  Error = "error",
  Message = "message",
  Success = "success",
  Warning = "warning",
  Notify = "notify"
}

export enum MessagePosition {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  BotLeft = "bottom-left",
  BotCenter = "bottom-center",
  BotRight = "bottom-right"
}
