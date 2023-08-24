export class ListOrder{
    orderId: string
    orderCode:string
    userName:string
    totalPrice:number
    createdDate:Date
    completed:boolean
}

export class ListOrderResponse {
    totalOrder: number;
    listOrder: ListOrder[];
}