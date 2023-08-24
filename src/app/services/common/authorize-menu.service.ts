import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { AuthorizeMenu } from 'src/app/contracts/authorize_menu/authorize_menu';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeMenuService {

  constructor(
    private httpService: HttpClientService
  ) { }

  async GetAuthorizeDefinationEndpoint() {
    const observable: Observable<AuthorizeMenu[]> = this.httpService.get<AuthorizeMenu[]>({
      Controller: "AuthorizeService"
    })

    return await firstValueFrom(observable);
  }
}
