import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { Observable, first, firstValueFrom } from 'rxjs';
import { ListOrder, ListOrderResponse } from 'src/app/contracts/order/list_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpClientService) { }

  async create(order: CreateOrder): Promise<void> {
    const observable: Observable<any> = this.httpService.post({
      Controller: "Order"
    }, order)

    await firstValueFrom(observable)
  }

  async getAllOrders(page: number = 0, size: number = 5): Promise<ListOrderResponse> {
    const observable: Observable<ListOrderResponse> = this.httpService.get({
      Controller: "Order",
      QueryString: `page=${page}&size=${size}`
    })

    return await firstValueFrom(observable)
  }

  async getOrderById(id: string, successCallBack?: () => void, errorCallBack?: (errors: string) => void) {
    try {
      const observable: Observable<SingleOrder> = this.httpService.get<SingleOrder>({
        Controller: "Order"
      }, id)
      const promiseData = await firstValueFrom(observable);
      if (successCallBack) {
        successCallBack(); // Eğer successCallBack belirtilmişse çağırılır
      }
      return promiseData;
    } catch (error) {
      if (errorCallBack) {
        errorCallBack(error); // Eğer errorCallBack belirtilmişse çağırılır
      }
      throw error; // Hata yeniden fırlatılır
    }
  }

  async completeOrder(id: string) {
    const observable: Observable<any> = this.httpService.get({
      Controller: "Order",
      Action: "comleteorder"
    }, id)

    await firstValueFrom(observable)
  }

}
