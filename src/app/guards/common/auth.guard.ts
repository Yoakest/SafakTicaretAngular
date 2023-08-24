import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { AuthService, isAuthenticated } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/customToastr/custom-toastr.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toasterService: CustomToastrService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // let token: string = localStorage.getItem("accessToken")
    // let isExpire: boolean

    // try {
    //   isExpire = this.jwtHelper.isTokenExpired(token)
    // } catch {
    //   isExpire = true
    // }


    if (!isAuthenticated) {
      const a = this.userService.refreshToken(localStorage.getItem("refreshToken")).then(data => {
        if (data) {
          return true
        }
        else {
          this.toasterService.message("Lütfen giriş yapınız", "Yetkisiz erişim",
            {
              messageType: ToastrMessageType.Warning
            })
          this.router.navigate(["login"], { queryParams: { returt: state.url } })

          return false
        }
      })
    }
    return true;
  }
}