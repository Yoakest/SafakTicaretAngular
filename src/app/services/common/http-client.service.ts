import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { LoginUser } from 'src/app/contracts/user/login_user';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }


  createUrl(requestParameters: Partial<RequestParameters>): string {
    return `${requestParameters.BaseUrl ? requestParameters.BaseUrl : this.baseUrl}/${requestParameters.Controller}${requestParameters.Action ? `/${requestParameters.Action}` : ""}`;
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    if (!requestParameters.EndPoint) {
      url = `${this.createUrl(requestParameters)}${id ? `/${id}` : ""}${requestParameters.QueryString ? `?${requestParameters.QueryString}` : ""}`
    }
    else {
      url = requestParameters.EndPoint
    }

    return this.httpClient.get<T>(url, { headers: requestParameters.Headers, responseType: requestParameters.ResponseType as 'json' });
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (!requestParameters.EndPoint) {
      url = `${this.createUrl(requestParameters)}${requestParameters.QueryString ? `?${requestParameters.QueryString}` : ""}`
    }
    else {
      url = requestParameters.EndPoint
    }

    return this.httpClient.post<T>(url, body, { headers: requestParameters.Headers, responseType: requestParameters.ResponseType as 'json' })
  }


  tokenPost(requestParameters: Partial<RequestParameters>, body: string): Observable<LoginUser> {
    let url: string = "";
    if (!requestParameters.EndPoint) {
      url = `${this.createUrl(requestParameters)}${requestParameters.QueryString ? `?${requestParameters.QueryString}` : ""}`
    }
    else {
      url = requestParameters.EndPoint
    }

    return this.httpClient.post<LoginUser>(url, { RefreshToken: body }, { headers: requestParameters.Headers, responseType: requestParameters.ResponseType as 'json' })
  }




  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (!requestParameters.EndPoint) {
      url = `${this.createUrl(requestParameters)}${requestParameters.QueryString ? `?${requestParameters.QueryString}` : ""}`
    }
    else {
      url = requestParameters.EndPoint
    }

    return this.httpClient.put<T>(url, body, { headers: requestParameters.Headers, responseType: requestParameters.ResponseType as 'json' })
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";
    if (!requestParameters.EndPoint) {
      url = `${this.createUrl(requestParameters)}/${id}${requestParameters.QueryString ? `?${requestParameters.QueryString}` : ""}`
    }
    else {
      url = requestParameters.EndPoint
    }

    return this.httpClient.delete<T>(url, { headers: requestParameters.Headers, responseType: requestParameters.ResponseType as 'json' })
  }
}


export class RequestParameters {
  Controller?: string;
  Action?: string;
  Id?: string;
  Headers?: HttpHeaders;
  BaseUrl?: string;
  EndPoint?: string;
  QueryString?: string;
  ResponseType?: string = "json";
}