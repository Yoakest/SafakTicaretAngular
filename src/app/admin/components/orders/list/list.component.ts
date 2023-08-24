import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListOrder, ListOrderResponse } from 'src/app/contracts/order/list_order';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { OrderService } from 'src/app/services/common/models/order.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class ListComponent {

  constructor(
    private orderService: OrderService,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {
  }

  displayedColumns: string[] = ["orderCode", "userName", "totalPrice", "createdDate", "completed", "detail"];

  dataSource: MatTableDataSource<ListOrder> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    const allOrders: ListOrderResponse = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5)
    console.log(allOrders);

    this.dataSource = new MatTableDataSource<ListOrder>(allOrders["orders"])
    this.paginator.length = allOrders["totalCount"]

  }

  formatCreatedDate(createdDate: string): string {
    const date = new Date(createdDate);

    if (date.getFullYear() < 2023) {
      return 'Güncellenmedi';
    }
    const formattedDate = this.datePipe.transform(createdDate, 'dd.MM.yyyy HH:mm');
    return formattedDate || '';
  }

  orderDetails(orderId: string) {
    // this.dynamicLoadComponentService.loadComponent(ComponentName.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef)
    let a = this.dialog.open(OrderDetailDialogComponent, {
      width: '80%',
      data: orderId
    })

    a.afterClosed().subscribe(async () => {
      const allOrders: ListOrderResponse = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5)
      this.dataSource = new MatTableDataSource<ListOrder>(allOrders["orders"])
      this.paginator.length = allOrders["totalCount"]
    }
    )
  }


  async pageChanged() {
    await this.getOrders()
  }


}