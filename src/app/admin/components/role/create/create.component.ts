import { Component, EventEmitter, Output } from '@angular/core';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  @Output() createRole: EventEmitter<string> = new EventEmitter();

  constructor(
    private roleService: RoleService,
    private alertify: AlertifyService,
  ) {
  }

  create(Name: HTMLInputElement) {
    this.roleService.createRole(Name.value,

      () => {
        this.alertify.message("Ürün Eklendi", {
          messageType: MessageType.Success,
          messagePosition: MessagePosition.TopLeft
        });
      },

      (errors) => {
        for (const error in errors) {
          errors[error].forEach(errorMsg => {
            this.alertify.message(errorMsg, {
              messageType: MessageType.Error,
              messagePosition: MessagePosition.TopLeft,
              delay: 5
            })
          });
        }
      })
    this.createRole.emit();
  }


}
