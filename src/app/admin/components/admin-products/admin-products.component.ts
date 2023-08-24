import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { QrCodeReadingDialogComponent } from 'src/app/dialogs/qr-code-reading-dialog/qr-code-reading-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {


  constructor(
    private dialogService: DialogService
  ) {
  }

  @ViewChild(ListComponent) listComponents: ListComponent

  createdProduct(createdProduct: CreateProduct) {
    this.listComponents.getProducts();
  }

  ngOnInit(): void {

  }

  showProductQrCodeReading() {
    const a = this.dialogService.openDialog({
      componentType: QrCodeReadingDialogComponent,
      data: null,
      options: {
        width: '60%'
      },
      afterClose: () => {
        this.listComponents.getProducts();
      }
    })
    
  }

}