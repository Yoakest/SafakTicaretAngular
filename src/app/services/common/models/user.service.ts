import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/contracts/user';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { Observable, first, firstValueFrom, observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType } from '../../customToastr/custom-toastr.service';
import { LoginUser } from 'src/app/contracts/user/login_user';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService, isAuthenticated } from '../auth.service';
import { GoogleService } from '../../google.service';
import { Token } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';
import { AuthGuard } from 'src/app/guards/common/auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GetUsers } from 'src/app/contracts/user/list_users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpClientService,
    private toastrService: CustomToastrService,
    private authService: AuthService,
  ) { }


  async getAllUsers(page: number = 0, size: number = 5,) {
    const observable: Observable<GetUsers> = await this.httpService.get({
      Controller: "User",
      QueryString: `page=${page}&size=${size}`
    })

    return await firstValueFrom(observable)
  }

  async refreshToken(RefreshToken: string): Promise<any> {

    const observable: Observable<any | LoginUser> = await this.httpService.post<any | CreateUser>({
      Controller: "User",
      Action: "RefreshToken"
    }, { RefreshToken: RefreshToken })

    const response: LoginUser = await firstValueFrom(observable)

    if (response.isSuccess) {
      localStorage.setItem("accessToken", response.token.token)
      localStorage.setItem("refreshToken", response.token.refreshToken)
      this.authService.identityCheck()
      isAuthenticated

      return true
    } else {
      return false
    }
  }

  async create(user: User) {
    const createResponse: Observable<User | CreateUser> = this.httpService.post<User | CreateUser>({
      Controller: "User",
    }, user)

    return await firstValueFrom(createResponse) as CreateUser;
  }

  async login(UserNameOrEmail: string, Password: string): Promise<LoginUser> {
    const observable: Observable<any> = this.httpService.post<any | LoginUser>({
      Controller: "User",
      Action: "Login"
    }, { UserNameOrEmail, Password })

    const loginResponse = await firstValueFrom<LoginUser>(observable)


    if (loginResponse.token) {
      localStorage.setItem("accessToken", loginResponse.token.token)
      localStorage.setItem("refreshToken", loginResponse.token.refreshToken)
    }

    return loginResponse
  }


  async googleLogin(user: SocialUser): Promise<LoginUser> {
    if (user && !user?.lastName) {
      user.lastName = "null"
    }

    const observable: Observable<any> = this.httpService.post<SocialUser>({
      Action: "google-login",
      Controller: "User",
    }, user)

    const loginResponse = await firstValueFrom<LoginUser>(observable)

    if (loginResponse.token) {
      localStorage.setItem("accessToken", loginResponse.token.token)
      localStorage.setItem("refreshToken", loginResponse.token.refreshToken)
    }

    return loginResponse

  }


  async loguot() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    this.authService.identityCheck()
    this.toastrService.message("Oturum kapatılmıştır", "Çıkış işlemi", {
      messageType: ToastrMessageType.Success
    })
  }


  async assignRolToUser(id: string, roles: string[]) {
    const observable: Observable<any> = this.httpService.post({
      Controller: "User",
      Action:"assingroletouser"
    }, {
      userId: id, roles: roles
    })

    await firstValueFrom(observable)
  }


  async getRolesToUser(userId: string) {
    const observable: Observable<{ userRoles: string[] } | any> = this.httpService.get({
      Controller: "User",
      Action: "getrolestouser"
    }, userId)

    return await firstValueFrom(observable)
  }
}
