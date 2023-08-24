import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/services/common/alertify.service';
import { PrdoductService } from 'src/app/services/common/models/prdoduct.service';


@Directive({
  selector: '[appEdit]'
})
export class EditDirective {

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private productService: PrdoductService,
    private alertify: AlertifyService
  ) {
    const img = render.createElement("img")
    img.setAttribute("src", "/assets/edit.png")
    img.setAttribute("style", "cursor: pointer; height: 32px; margin-left: 10px;")
    render.appendChild(element.nativeElement, img)
  }


  

}
