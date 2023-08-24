import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }


  async openDialog(dialogParameters: Partial<DialogParameters>): Promise<void> {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data,
    });
    if (dialogParameters.afterClose) {
      dialogRef.afterClosed().subscribe(result => {
        if (result == dialogParameters.data) {
          dialogParameters.afterClose();
        }
      });
    }

  }
  

}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClose: () => void = () => { };
  options?: Partial<DialogOptions> = new DialogOptions();
}

export class DialogOptions {
  width?: string = "250px";
  height?: string;
  position?: DialogPosition;
}
