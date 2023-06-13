import { Component } from '@angular/core';
import { SendService } from '../api/send.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sendService: SendService, private router: Router) { }

  iniciar_sessao() {

    let randomNumbersString = "";

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * 100); // Gera um número aleatório entre 0 e 99
      randomNumbersString += randomNumber.toString();
    }
    const id = {
      sessionId: "RAISSA_" + randomNumbersString
    }

    this.sendService.startSession(id)
      .then((qrCodeBase64: any) => {
        const img = document.getElementById("imagem") as HTMLImageElement;
        img.src = qrCodeBase64?.qr;
        console.log(qrCodeBase64)
        setTimeout(async() => {
          let status;
          this.sendService.getStatusSession()
          .then((retorno:any) => {
            status = retorno.status;
            if (status == "AUTHENTICATED")
              this.router.navigate(['/send'])
            //window.location.href = "../send";
          })
          .catch((erro) => {
            console.log(erro.error);
          });          
        }, 40000);
      })
      .catch((erro) => {
        console.log(erro.error);
      });
  }

}
