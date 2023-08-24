import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { ProductImagesDialogComponent } from 'src/app/dialogs/product-images-dialog/product-images-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';


@NgModule({
  declarations: [
    FileUploadDialogComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
