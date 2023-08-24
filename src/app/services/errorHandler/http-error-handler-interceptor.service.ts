import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../customToastr/custom-toastr.service';
import { UserService } from '../common/models/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private toastrService: CustomToastrService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      console.log(err);
      switch (err.status) {


        case HttpStatusCode.Unauthorized:
          const url = this.router.url
          if (url == "/products") {
            this.toastrService.message("Sepete ürün eklemek için lütfen giriş yapınız", "Otrum açıınız")
          } else {
            this.toastrService.message("Bu işleme yetkiniz bulunmamaktadır.", "Yetkisiz işlem", {
              messageType: ToastrMessageType.Warning,
              messagePosition: ToastrPosition.BottomFullWidth,
              timeOut: 1000
            })
            this.spinnerService.hide("page-loading")
            this.spinnerService.hide("data-loading")
            this.spinnerService.hide("updating")
          }
          break
        case HttpStatusCode.InternalServerError:
          if (err.error.Message == "Ürün stokları tükenmiştir!!") {
            this.toastrService.message("Ürün Stokları Tükenmiştir!!", "STOKLAR TÜKENDİ", {
              messageType: ToastrMessageType.Error,
              messagePosition: ToastrPosition.BottomFullWidth,
              timeOut: 3000
            })
          } else {

            this.toastrService.message("Server ile bağlantı kurulamıyor.", "Server?", {
              messageType: ToastrMessageType.Warning,
              messagePosition: ToastrPosition.BottomFullWidth,
              timeOut: 1000
            })
          }
          this.spinnerService.hide("page-loading")
          this.spinnerService.hide("data-loading")
          this.spinnerService.hide("updating")
          break
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz işlem.", "Bad Request", {
            messageType: ToastrMessageType.Warning,
            messagePosition: ToastrPosition.BottomFullWidth,
            timeOut: 1000
          })
          this.spinnerService.hide("page-loading")
          this.spinnerService.hide("data-loading")
          this.spinnerService.hide("updating")
          break
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sonuç bulunamadı.", "Not Found", {
            messageType: ToastrMessageType.Warning,
            messagePosition: ToastrPosition.BottomFullWidth,
            timeOut: 1000
          })
          this.spinnerService.hide("page-loading")
          this.spinnerService.hide("data-loading")
          this.spinnerService.hide("updating")
          break
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi.", "Hata", {
            messageType: ToastrMessageType.Warning,
            messagePosition: ToastrPosition.BottomFullWidth,
            timeOut: 1000
          })
          this.spinnerService.hide("page-loading")
          this.spinnerService.hide("data-loading")
          this.spinnerService.hide("updating")
          break
      }
      return of(err)
    }))

  }
}
