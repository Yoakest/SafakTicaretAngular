import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/fileUpload/file-upload/file-upload.component';
import { PrdoductService } from 'src/app/services/common/models/prdoduct.service';
import { ListProductImage } from 'src/app/contracts/list_product_image';
import { DeleteDialogComponent, DeleteState } from 'src/app/admin/directives/delete/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-images-dialog',
  templateUrl: './product-images-dialog.component.html',
  styleUrls: ['./product-images-dialog.component.scss']
})
export class ProductImagesDialogComponent extends BaseDialog<ProductImagesDialogComponent> implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductImagesState | string,
    dialogRef: MatDialogRef<ProductImagesDialogComponent>,
    private productService: PrdoductService,
    private dialogservie: DialogService,
    private alertifyService: AlertifyService,
    private domSanitizer: DomSanitizer
  ) {
    super(dialogRef)
  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "Product",
    action: "Upload",
    explanation: "Ürün için resimleri seçiniz...",
    accept: ".png, .jpg, .jpeg",
    querString: `id=${this.data}`
  }



  // async ngOnInit() {
  //   const qrCodeBlob: Blob = await this.qrcodeService.getQrCode(this.data)
  //   const url: string = URL.createObjectURL(qrCodeBlob)
  //   this.qrUrl = this.domSanitizer.bypassSecurityTrustUrl(url)
  // }


  images: ListProductImage[];
  productId: string
  imageSrc: Blob[]
  async ngOnInit() {
    console.log(this.data);
    this.images = await this.productService.readImages(this.data as string);
    console.log(this.images);
    this.images.forEach(async image => {
      const _blob: Blob = await this.productService.getImage(image.fileName);
      const url: string = URL.createObjectURL(_blob)
      image.qrUrl = this.domSanitizer.bypassSecurityTrustUrl(url)
    });
  }

  async deleteImage(imageId: string) {
    const index = this.images.findIndex(image => image.id === imageId);

    this.dialogservie.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClose: async () => {
        if (index !== -1) {
          await this.productService.deleteImage(this.data as string, imageId);
          this.images.splice(index, 1);
        }
      }
    })
  }


  async showcase(imageId: string) {
    const response = await this.productService.selectProductImage(this.data as string, imageId)
    this.alertifyService.message(response.message, {
      messageType: MessageType.Success,
      messagePosition: MessagePosition.BotRight
    })

  }
}

enum ProductImagesState {
  Close
}