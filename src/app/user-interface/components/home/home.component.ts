import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AddBasketItem } from 'src/app/contracts/basket/add-basket-item';
import { ListProduct, ListProductResponse } from 'src/app/contracts/list_products';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { PrdoductService } from 'src/app/services/common/models/prdoduct.service';
import { CustomToastrService, ToastrPosition, ToastrMessageType } from 'src/app/services/customToastr/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private productService: PrdoductService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private toastrSerevice: CustomToastrService,
    private domSanitizer: DomSanitizer
  ) {
  }

  currentPageNo: number
  totalProductCount: number
  totalPageCount: number
  products: ListProduct[]
  productListSize: number = 30
  pageList: number[] = []

  ngOnInit() {

    this.activatedRoute.params.subscribe(async p => {
      this.currentPageNo = parseInt(p["pageNo"] ?? 1)

      const productsList: ListProductResponse = await this.productService.listProducts(this.currentPageNo - 1, this.productListSize, () => {
      }, errorMessage => {
      })

      this.products = productsList["products"]
      console.log(this.products);
      this.products.forEach(product => {
        console.log(product);
        product.productImages.forEach(async _image => {
          console.log(_image)
          if (_image.showcase) {
            const _blob: Blob = await this.productService.getImage(_image.fileName);
            const url: string = URL.createObjectURL(_blob)
            _image.qrUrl = this.domSanitizer.bypassSecurityTrustUrl(url)

          }
        })

      })



      this.totalProductCount = productsList["totalCount"]
      this.totalPageCount = Math.ceil(this.totalProductCount / this.productListSize)

      this.pageList = []

      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7 && i <= this.totalPageCount; i++) {
          this.pageList.push(i)
        }
      } else {
        if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
            if (i <= 0) {
              i = 1
            }
            this.pageList.push(i)
          }
        } else {
          for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3 && i <= this.totalPageCount; i++) {
            this.pageList.push(i)
          }
        }
      }
    }
    )
  }


  async addToBasket(prdoduct: ListProduct) {
    let basketItem: AddBasketItem = new AddBasketItem()
    basketItem.productId = prdoduct.id
    basketItem.quantity = 1;
    await this.basketService.add(basketItem)
    this.toastrSerevice.message(prdoduct.name, "Sepete ürün ekleme", {
      messagePosition: ToastrPosition.BottomRight,
      messageType: ToastrMessageType.Success
    })

  }


}
