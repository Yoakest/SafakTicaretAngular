import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { StickyDirection } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService,
    private httpService: HttpClientService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken")

    let isExpire: boolean

    try {
      isExpire = this.jwtHelper.isTokenExpired(token)
    } catch {
      isExpire = true
    }

    isAuthenticated = (token != null) && !isExpire
  }

  get isAutheticated(): boolean {
    this.identityCheck();
    return isAuthenticated
  }

  async forgetPassword(email: string, callBackFunction?: () => void) {
    const observable: Observable<any> = this.httpService.post({
      Controller: "User",
      Action: "passwordreset"
    }, { email: email })

    await firstValueFrom(observable)
    callBackFunction();
  }

  async resetTokenIsValid(userId: string, token: string, callBackFunction: () => void): Promise<boolean> {
    const observable: Observable<any> = this.httpService.post({
      Controller: "User",
      Action: "verifyresettoken"
    }, { resetToken: token, userId: userId })


    const state: boolean = await firstValueFrom(observable)
    callBackFunction()
    return state
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpService.post({
      Action: "updatepassword",
      Controller: "User"
    }, {
      userId, resetToken, password, passwordConfirm
    })

    const promiseData: Promise<any> = firstValueFrom(observable)

    promiseData.then(
      value => successCallBack()
    ).catch(err => errorCallBack(err))

    await promiseData
  }


}


export let isAuthenticated: boolean