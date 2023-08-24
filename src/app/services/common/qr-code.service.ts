import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Action } from 'src/app/contracts/authorize_menu/authorize_menu';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(
    private httpService: HttpClientService
  ) { }

  async getQrCode(productId: string) {
    const observable: Observable<Blob> = this.httpService.get({
      Controller: "Product",
      Action: "qrcode",
      ResponseType: "blob"
    }, productId)

    return await firstValueFrom(observable)
  }


  async updateStock (productId:string){
    const observable: Observable<any> = this.httpService.get({
      Controller: "Product",
      Action: "updatestock",
    }, productId)
    return await firstValueFrom(observable)
  }

}
