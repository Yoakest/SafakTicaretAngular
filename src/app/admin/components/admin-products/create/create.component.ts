import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/common/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { PrdoductService } from 'src/app/services/common/models/prdoduct.service';
import { FileUploadOptions } from 'src/app/services/fileUpload/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "Product",
    action: "Upload",
    explanation: "Resimleri seçiniz...",
    accept: ".png, .jpg, .jpeg"
  }

  constructor(
    spinner: NgxSpinnerService,
    private productService: PrdoductService,
    private alertify: AlertifyService,
    private httpService: HttpClientService
  ) {
    super(spinner)
  }
  async createProducts() {
    await this.httpService.get({
      Action: "Yarat",
      Controller: "Product"
    }).subscribe()
  }

  createProduct(Name: HTMLInputElement, Price: HTMLInputElement, Stock: HTMLInputElement) {
    this.showSpinnner(SpinnerType.dataLoading)

    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = Name.value;
    createProduct.price = parseFloat(Price.value);
    createProduct.stock = parseInt(Stock.value)

    //#region  ürün oluşturma
    this.productService.createProduct(createProduct, () => {

      this.hideSpinner(SpinnerType.dataLoading)
      this.alertify.message("Ürün Eklendi", {
        messageType: MessageType.Success,
        messagePosition: MessagePosition.TopLeft
      });
      this.createdProduct.emit(createProduct);
    }, (errors) => {

      for (const error in errors) {
        errors[error].forEach(errorMsg => {
          this.hideSpinner(SpinnerType.dataLoading)

          this.alertify.message(errorMsg, {
            messageType: MessageType.Error,
            messagePosition: MessagePosition.TopLeft,
            delay: 5
          })

        });
      }

      this.hideSpinner(SpinnerType.dataLoading)
    })
    //#endregion

  }

}
