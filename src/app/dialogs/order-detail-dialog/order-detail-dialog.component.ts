import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/customToastr/custom-toastr.service';
import { MatPaginator } from '@angular/material/paginator';




@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(
    private dialogService: DialogService,
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
  ) {
    super(dialogRef)
  }

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = []
  clickedRows = new Set<any>();
  singleOrder: SingleOrder
  totalPrice: number

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(this.data as string)
    console.log(this.singleOrder);
    

    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current, 0)

  }

  async completeOrder() {
    await this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClose: async () => {
        await this.orderService.completeOrder(this.data as string)
        this.singleOrder = await this.orderService.getOrderById(this.data as string)
        this.toastrService.message("Spariş bilgileri kullanıcıya mail ile gönderilmiştir.", "Sipariş Tamamlandı", {
          messagePosition: ToastrPosition.BottomLeft,
          messageType: ToastrMessageType.Success
        })
      }
    });
  }
}



export enum OrderDetailDialogState {
  Close, OrderComplete
}