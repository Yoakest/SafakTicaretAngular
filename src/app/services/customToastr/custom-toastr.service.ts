import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  message(message: string, title: string, optipons: Partial<ToastrCustomOptions> = {} ) {
    const {
      messageType = ToastrMessageType.Warning,
      messagePosition = ToastrPosition.TopCenter,
      timeOut = 5000
    } = optipons;

    this.toastr[messageType](message, title,{
      positionClass: messagePosition,
      timeOut : timeOut
    })
  }
}


export class ToastrCustomOptions {
  messageType: ToastrMessageType;
  messagePosition: ToastrPosition;
  timeOut: number;
}

//toaster timeout number

export enum ToastrPosition {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}

export enum ToastrMessageType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info"
}