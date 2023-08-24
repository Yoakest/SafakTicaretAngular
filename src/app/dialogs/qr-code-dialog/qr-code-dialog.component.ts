import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { AlertifyService } from 'src/app/services/common/alertify.service';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent extends BaseDialog<QrCodeDialogComponent> implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    dialogRef: MatDialogRef<QrCodeDialogComponent>,
    private alertifyService: AlertifyService,
    private qrcodeService: QrCodeService,
    private domSanitizer: DomSanitizer
  ) {
    super(dialogRef)
  }

  qrUrl: SafeUrl
  async ngOnInit() {
    const qrCodeBlob: Blob = await this.qrcodeService.getQrCode(this.data)
    const url: string = URL.createObjectURL(qrCodeBlob)
    this.qrUrl = this.domSanitizer.bypassSecurityTrustUrl(url)
  }
}
