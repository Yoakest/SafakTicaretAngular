import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../admin/directives/delete/delete-dialog/delete-dialog.component';
import { MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductImagesDialogComponent } from './product-images-dialog/product-images-dialog.component';
import { FileUploadModule } from '../services/fileUpload/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { BasketGiveOrderComponent } from './basket-give-order/basket-give-order.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';
import { QrCodeReadingDialogComponent } from './qr-code-reading-dialog/qr-code-reading-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    ProductImagesDialogComponent,
    BasketItemRemoveDialogComponent,
    BasketGiveOrderComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    QrCodeDialogComponent,
    QrCodeReadingDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    FileUploadModule,
    MatTableModule,
    MatBadgeModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxScannerQrcodeModule
  ],
  exports: []
})
export class DialogModule { }
