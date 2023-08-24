import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { BaseDialog } from '../base/base-dialog';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qr-code-reading-dialog',
  templateUrl: './qr-code-reading-dialog.component.html',
  styleUrls: ['./qr-code-reading-dialog.component.scss']
})
export class QrCodeReadingDialogComponent extends BaseDialog<QrCodeReadingDialogComponent> implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    dialogRef: MatDialogRef<QrCodeReadingDialogComponent>,
    private alertifyService: AlertifyService,
    private qrcodeService: QrCodeService,
  ) {
    super(dialogRef)
  }

  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent
  @ViewChild("textStock", { static: true }) textStock: ElementRef

  async ngOnInit() {
    this.scanner.decode = "utf8"
    this.scanner.start()
  }

  ngOnDestroy(): void {
    this.scanner.stop()
  }

  product: Product = new Product()

  scanned(event: ScannerQRCodeResult[]) {
    // console.log((event as { data: string }).data);

    event.forEach(e => {
      this.product = JSON.parse(e.value)
    })
    this.scanner.pause()
    if (this.product.Stock > 0) {
        this.qrcodeService.updateStock(this.product.Id)
    } else {
      this.alertifyService.message("Stoklarda ürün kalmamaıştır!!", {
        messagePosition: MessagePosition.TopCenter,
        messageType: MessageType.Error
      })
    }
    setTimeout(() => {
      this.scanner.play()
    }, 2000)
  }


  updateStock() {
    const stockValue = (this.textStock.nativeElement as HTMLInputElement).value

    this.qrcodeService.updateStock(this.product.Id)

  }


  startCam() {
    this.scanner.play()
  }
}

class Product {
  Id: string
  Name: string
  Price: number
  Stock: number
}


