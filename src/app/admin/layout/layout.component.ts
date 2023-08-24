import { Component, OnInit, booleanAttribute } from '@angular/core';
import { SignalROnFunctions } from 'src/app/constants/signalR-on-functions';
import { SignalRStartFunctions } from 'src/app/constants/signalR-start-functions';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { SignalRService } from 'src/app/services/signalR/signal-r.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private alertService: AlertifyService,
    private signalRService: SignalRService,
  ) {
  }

  ngOnInit(): void {
    this.signalRService.on(SignalRStartFunctions.ProductFunction, SignalROnFunctions.ProductFunction, message => {
      this.alertService.message(message, {
        messageType: MessageType.Warning,
        messagePosition: MessagePosition.BotRight
      })
    })

    this.signalRService.on(SignalRStartFunctions.OrderFunction, SignalROnFunctions.OrderFunction, message => {
      this.alertService.message(message, {
        messageType: MessageType.Warning,
        messagePosition: MessagePosition.BotRight
      })
    })
  }
}
