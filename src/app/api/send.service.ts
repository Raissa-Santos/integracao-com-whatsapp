import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendService {

  urlBase="https://whatsapp.atendezap.digital";
  secret="";//token

  constructor(private http: HttpClient) { }

  session_id = "";

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        secret: this.secret,
      }),
    };
    return httpOptions;
  }

  startSession(id: any){
    console.log("iniciou a sessão: "+id.sessionId)
    this.session_id=id.sessionId;
    return this.http.post(`${this.urlBase}/sessions/add`,id,this.getHttpOptions()).toPromise();
  }

  getStatusSession(){
    return this.http.get(`${this.urlBase}/sessions/${this.session_id}/status`,this.getHttpOptions()).toPromise();
  }

  sendText(envio: any){
    return this.http.post(`${this.urlBase}/${this.session_id}/messages/send`,envio,this.getHttpOptions()).toPromise();
  }

  validaNumero(numero: any){
    return this.http.get(`${this.urlBase}/${this.session_id}/contacts/${numero}`,this.getHttpOptions()).toPromise();
  }

}
