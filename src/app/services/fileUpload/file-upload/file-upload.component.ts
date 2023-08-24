import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../../common/http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../../dialogService/dialog.service';
import { AlertifyService, MessageType } from '../../common/alertify.service';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  /**
   *
   */
  constructor(
    private httpService: HttpClientService,
    private alertifyService: AlertifyService,
    // private dialog: MatDialog,
    private dialogService: DialogService
  ) {
  }
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;


  public dropped(files: NgxFileDropEntry[]) {

    this.files = files;
    const formData = new FormData()

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        
        fileEntry.file((file: File) => {
       

          formData.append(file.name, file, droppedFile.relativePath)
        });

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      
      }
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
  
      
      
      afterClose: () => {
        this.httpService.post({
          Controller: this.options.controller,
          Action: this.options.action,
          QueryString: this.options.querString,
          Headers: new HttpHeaders({ responseType: 'blob' }),
        }, formData).subscribe(data => {
          this.alertifyService.message("Dosyalar başarı ile yüklenmiştir.", {
            messageType: MessageType.Success
          })
        }, (errorResponse: HttpErrorResponse) => {
          this.alertifyService.message("Dosyalar yüklenemedi.", {
            messageType: MessageType.Error
          })
        })
      }
    })


  }
  
  public fileOver(event) {

  }

  public fileLeave(event) {
   
  }

}

export class FileUploadOptions {
  controller?: string
  action?: string
  querString?: string
  explanation?: string
  accept?: string
}


