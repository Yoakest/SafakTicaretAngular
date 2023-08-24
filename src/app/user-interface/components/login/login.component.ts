import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUser } from 'src/app/contracts/user/login_user';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/customToastr/custom-toastr.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastrService: CustomToastrService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private socialAuthService: SocialAuthService,
  ) {
  }
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {

      if (user) {
        const result: LoginUser = await this.userService.googleLogin(user)

        if (result.isSuccess) {
          this.toastrService.message(result.message, "Giriş işlemi", {
            messageType: ToastrMessageType.Success
          })
          this.authService.identityCheck()
          this.returnRoute()
        } else {
          this.toastrService.message(result.message, "Giriş işlemi", {
            messageType: ToastrMessageType.Error
          })
        }
      }

    })
  }



  async login(UserNameOrEmail: string, Password: string) {

    const result: LoginUser = await this.userService.login(UserNameOrEmail, Password)

    if (result.isSuccess) {
      this.toastrService.message(result.message, "Giriş işlemi", {
        messageType: ToastrMessageType.Success
      })
      this.authService.identityCheck()
      this.returnRoute()
    } else {
      this.toastrService.message(result.message, "Giriş işlemi", {
        messageType: ToastrMessageType.Error
      })
    }
  }

  logout(){
    localStorage.removeItem("accessToken")
    this.authService.identityCheck()
  }


  returnRoute() {
    let returnUrl: string

    this.route.queryParams?.subscribe(params => {
      returnUrl = params["returt"]
    })

    if (returnUrl) {
      this.router.navigateByUrl(returnUrl)
    } else {
      this.router.navigate([""])
    }
  }

}
