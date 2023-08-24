import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  /**
   *
   */
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private router: Router

  ) {
  }

  state: boolean
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"]
        const resetToken: string = params["resetToken"]

        const sstate = await this.authService.resetTokenIsValid(userId, resetToken, () => { })
        this.state = sstate["state"]
      }
    })
  }

  updatePassword(password, passwordConfirm) {
    if (password != passwordConfirm) {
      this.alertifyService.message("Şifreler farklı")
      return
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"]
        const resetToken: string = params["resetToken"]
        await this.authService.updatePassword(userId, resetToken, password, passwordConfirm, () => {
          this.alertifyService.message("Şifre başarı ile değiştirilmiştir.", {
            messagePosition: MessagePosition.TopCenter,
            messageType: MessageType.Success
          })
          this.router.navigate(["/login"])
        },
          error => {
            this.alertifyService.message("Şifre değiştirme başarısız olmuştur. " + error, {
              messagePosition: MessagePosition.TopCenter,
              messageType: MessageType.Warning
            })
          }
        )
      }
    })
  }



}
