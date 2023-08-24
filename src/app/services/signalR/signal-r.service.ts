import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(
    @Inject("baseSignalRUrl") private baseSignalRUrl: string
  ) { }


  start(connectionUrl: string) {
    var hubUrl: string = ""
    hubUrl = this.baseSignalRUrl + connectionUrl

    const builder: HubConnectionBuilder = new HubConnectionBuilder()
    const hubConnection: HubConnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build()


    hubConnection.start()
      .then(() => {
      })
      .catch(() => { setTimeout(() => { this.start(hubUrl) }, 5000); })

    hubConnection.onreconnected(connectionId => console.log("Reconnected"))
    hubConnection.onreconnected(connectionId => console.log("Reconnecting"))
    hubConnection.onclose(error => console.log("Reconnectin is ended"))

    return hubConnection
  }

  invoke(connectionUrl: string, procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.start(connectionUrl).invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack)
  }

  on(connectionUrl: string, procedureName: string, callBack: (...message: any) => void) {
    this.start(connectionUrl).on(procedureName, callBack)
  }

}
