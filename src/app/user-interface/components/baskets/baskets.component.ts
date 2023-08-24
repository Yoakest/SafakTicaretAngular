import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetBasketItem } from 'src/app/contracts/basket/get-basket-item';
import { PutBasketItem } from 'src/app/contracts/basket/put-basket-item copy';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { BasketGiveOrderComponent, BasketOrderState } from 'src/app/dialogs/basket-give-order/basket-give-order.component';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/customToastr/custom-toastr.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})

export class BasketsComponent implements OnInit {
  @ViewChild("nested")
  nestedTmplateRef;


  constructor(
    private dialogRef: MatDialogRef<BasketsComponent>,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private dialogService: DialogService,
  ) {
  }

  basketItems: GetBasketItem[]
  async ngOnInit(): Promise<void> {
    this.basketItems = await this.basketService.get()
  }

  async changeQuantity(object) {
    const basketItemId: string = object.target.attributes["id"].value
    const quantity: number = object.target.value
    const putBasketItem: PutBasketItem = new PutBasketItem()
    putBasketItem.basketItemId = basketItemId
    putBasketItem.quantity = quantity
    await this.basketService.put(putBasketItem)
  }

  removeBasketItem(object) {
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClose: async () => {
        const basketItemId: string = object.target.attributes["id"].value
        await this.basketService.delete(basketItemId)
        this.basketItems = await this.basketService.get()
      }
    })
  }

  close() {
    this.dialogRef.close()
  }

  async giveOrder() {
    this.dialogService.openDialog({
      componentType: BasketGiveOrderComponent,
      data: BasketOrderState.Yes,
      afterClose: async () => {
        const order: CreateOrder = new CreateOrder()
        order.adress = "Tuzla/Istanbul"
        order.description = "Bana ürünümü ver"
        await this.orderService.create(order)
        this.toastrService.message("Siparişiniz oluşturulmuştur", "Sipariş", {
          messageType: ToastrMessageType.Success
        })
        this.basketItems = await this.basketService.get()
      }
    })

    this.basketItems = await this.basketService.get()
  }


}