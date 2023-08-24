import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-basket-give-order',
  templateUrl: './basket-give-order.component.html',
  styleUrls: ['./basket-give-order.component.scss']
})
export class BasketGiveOrderComponent extends BaseDialog<BasketGiveOrderComponent> {

  constructor(
    dialogRef : MatDialogRef<BasketGiveOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    super(dialogRef)
  }

}

export enum BasketOrderState {
  Yes, NO
}