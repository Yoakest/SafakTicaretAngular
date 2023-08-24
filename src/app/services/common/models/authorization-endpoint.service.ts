import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(
    private httpService: HttpClientService
  ) { }


  async assignRoleEndpoint(roles: string[], code: string, menu: String) {
    const observable: Observable<any> = this.httpService.post({
      Controller: "AuthorizationEndPoint"
    }, {
      endpointCode: code, roles: roles, menu
    })

    return firstValueFrom(observable)
  }

  getRolesToEndpoint(code: string, menu: string) {
    const observable = this.httpService.post({
      Controller: "AuthorizationEndPoint",
      Action: "GetRolesEndpoint"
    }, {
      Code: code, Menu: menu
    })
    return firstValueFrom(observable)
  }
}
