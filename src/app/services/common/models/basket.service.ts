import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { GetBasketItem } from 'src/app/contracts/basket/get-basket-item';
import { AddBasketItem } from 'src/app/contracts/basket/add-basket-item';
import { PutBasketItem } from 'src/app/contracts/basket/put-basket-item copy';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpService: HttpClientService) { }

  async get(): Promise<GetBasketItem[]> {
    const observable: Observable<GetBasketItem[]> = this.httpService.get({
      Controller: "Basket"
    })
    return await firstValueFrom(observable)
  }

  async add(product: AddBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpService.post({
      Controller: "Basket"
    }, product)
    await firstValueFrom(observable)
  }


  async put(product: PutBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpService.put({
      Controller: "Basket"
    }, product)
    await firstValueFrom(observable)
  }


  async delete(RemoveBasketItemId: string) {
    const observable: Observable<any> = this.httpService.delete({
      Controller: "Basket",
      Headers: new HttpHeaders().append("Content-Type", "application/problem+json").append("removeBasketItemId", RemoveBasketItemId)
    }, RemoveBasketItemId)
    await firstValueFrom(observable)
  }


}
