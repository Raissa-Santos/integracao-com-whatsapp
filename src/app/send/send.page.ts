import { Component, OnInit } from '@angular/core';
import { SendService } from '../api/send.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  texto: string = "";
  numero: string = "";

  constructor(private sendService: SendService) { }

  ngOnInit() {
  }

  enviar() {
    const numero = {
      "jid": this.numero,
      "type": "number"
    }

    const envio = {
      "jid": this.numero+"@s.whatsapp.net",
      "message": {
        "text": this.texto,
      },
      "delay": 5
    }

    var existe: boolean = false;

    this.sendService.validaNumero(numero.jid)
    .then((retorno:any) => {
      console.log("retorno: ",retorno)
      existe = retorno?.contact.exists;
      console.log("existe: "+existe);
      if(existe)
        this.sendService.sendText(envio);
    })
    .catch((erro) => {
      console.log(erro.error);
    });
  }
}


