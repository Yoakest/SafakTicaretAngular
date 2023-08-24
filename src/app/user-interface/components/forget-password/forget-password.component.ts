import { Component } from '@angular/core';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {
  }

  forgetPassword(mail:string){
    this.authService.forgetPassword(mail, ()=>{
      this.alertifyService.message(`${mail} şifre yenileme maili gönderilmiştir. Mailinizi Spam Klasörünü Kontrol Ediniz...`,{
        messagePosition: MessagePosition.TopRight,
        messageType:  MessageType.Message
      })
    })
  }

}
