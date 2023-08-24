import { SocialAuthService } from '@abacritt/angularx-social-login';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct, ListProductResponse } from 'src/app/contracts/list_products';
import { ProductImagesDialogComponent } from 'src/app/dialogs/product-images-dialog/product-images-dialog.component';
import { QrCodeDialogComponent } from 'src/app/dialogs/qr-code-dialog/qr-code-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { PrdoductService } from 'src/app/services/common/models/prdoduct.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})

export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    spinner: NgxSpinnerService,
    private productService: PrdoductService,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    private dialogService: DialogService,
  ) {
    super(spinner)
  }

  displayedColumns: string[] = ["name", "price", "stock", "createdDate", "photos", "updatedDate", "qrCode", "delete"];

  dataSource: MatTableDataSource<ListProduct> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;




  async getProducts() {
    const productsList: ListProductResponse = await this.productService.listProducts(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.dataLoading), errorMessage => this.alertify.message(errorMessage, {
      messageType: MessageType.Error,
      messagePosition: MessagePosition.TopLeft
    }))

    this.dataSource = new MatTableDataSource<ListProduct>(productsList["products"])
    this.paginator.length = productsList["totalCount"]
  }

  formatCreatedDate(createdDate: string): string {
    const date = new Date(createdDate);

    if (date.getFullYear() < 2023) {
      return 'Güncellenmedi';
    }
    const formattedDate = this.datePipe.transform(createdDate, 'dd.MM.yyyy HH:mm');
    return formattedDate || '';
  }

  async pageChanged() {
    await this.getProducts()
  }

  addProductImages(productId: string) {
    this.dialogService.openDialog({
      componentType: ProductImagesDialogComponent,
      data: productId
    })
  }

  showQr(id: string) {
    this.dialogService.openDialog({
      componentType: QrCodeDialogComponent,
      data: id
    })
  }


  async ngOnInit() {
    await this.getProducts();
  }

}