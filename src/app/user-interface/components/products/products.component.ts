import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
    
  }
  ngOnInit(): void {
    // this.showSpinnner(SpinnerType.pageLoading)
    // setTimeout(() => {this.hideSpinner(SpinnerType.pageLoading)}, 2000);
  }
  
  }