import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct, ListProductResponse } from 'src/app/contracts/list_products';
import { Observable, firstValueFrom } from 'rxjs';
import { ListProductImage } from 'src/app/contracts/list_product_image';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../customToastr/custom-toastr.service';
import { ApiResponse } from 'src/app/contracts/api_response';


@Injectable({
  providedIn: 'root'
})
export class PrdoductService {

  constructor(
    private httpService: HttpClientService,
    private toastr: CustomToastrService
  ) { }

  createProduct(product: CreateProduct, successCallBack?: () => void, errorCallBack?: (errors) => void) {
    this.httpService.post({
      Controller: "product",
    },
      product
    ).subscribe(data => {
      debugger
      successCallBack();
    },
      (errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.error["errors"]))
  }

  async listProducts(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errors) => void): Promise<ListProductResponse> {
    const promiseData: Promise<ListProductResponse> = this.httpService.get<ListProductResponse>({
      Controller: "Product",
      QueryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.error["errors"]))


    return await promiseData;
  }


  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpService.delete<any>({
      Controller: "Product"
    }, id);
    await firstValueFrom(deleteObservable);
  }


  async readImages(id: string): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this.httpService.get<ListProductImage[]>({
      Controller: "Product",
      Action: "GetProductImages"
    }, id);

    return await firstValueFrom(getObservable);
  }

  async getImage(fileName: string) {
    const getObservable: Observable<Blob> = this.httpService.get<Blob>({
      Controller: "Product",
      Action: "GetImage",
      ResponseType: "blob"
    }, fileName);

    return await firstValueFrom(getObservable);
  }


  async selectProductImage(productId: string, imageId: string) {
    const observable: Observable<ApiResponse> = this.httpService.get<ApiResponse>({
      Action: "SelectImageFile",
      Controller: "Product",
      QueryString: `ImageId=${imageId}&ProductId=${productId}`
    })

    return await firstValueFrom(observable)
  }


  async deleteImage(productId: string, imageId: string) {
    await firstValueFrom(this.httpService.delete({
      Controller: "Product",
      Action: "DeleteProductImage",
      QueryString: `ImageId=${imageId}`
    }, productId)
    )
  }



}



