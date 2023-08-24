import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { ListProduct } from 'src/app/contracts/list_products';
import { DeleteDialogComponent, DeleteState } from './delete/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private httpClient: HttpClientService,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {
    const icon = render.createElement("i")
    icon.setAttribute("class", "fa-regular fa-trash-can")
    icon.setAttribute("style", "cursor: pointer; font-size: 24px; color: rgb(204,0,0);")
    render.appendChild(element.nativeElement, icon)
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")

  async onClick() {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClose: async () => {
        const td: HTMLTableCellElement = this.element.nativeElement;
        await this.httpClient.delete({
          Controller: this.controller
        }, this.id).subscribe(data => {
          this.callback.emit();
          this.alertify.message(`${this.id} silindi...`, {
            messageType: MessageType.Success,
            messagePosition: MessagePosition.TopLeft,
            delay: 4
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.alertify.message(`${this.id} silinirken hata oluştu ${errorResponse.message}`, {
            messageType: MessageType.Error,
            messagePosition: MessagePosition.TopCenter,
            delay: 5
          })
        }
        )
      }

    })
  }




}


