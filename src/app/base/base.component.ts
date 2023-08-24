import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinnerService: NgxSpinnerService) { }

  showSpinnner(spinnerType: SpinnerType) {
    this.spinnerService.show(spinnerType)
  }

  hideSpinner(spinnerType: SpinnerType) {
    this.spinnerService.hide(spinnerType)
  }

}

export enum SpinnerType {
  pageLoading = "page-loading",
  dataLoading = "data-loading",
  updating = "updating"
}