
import { Component, OnInit } from '@angular/core';
import { BdService } from './../../services/bd.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.scss']
})
export class PublicacoesComponent implements OnInit {

  email: string;
  publicacoes: any;

  constructor(private bdService: BdService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.atualizarTimeline()
    })
  }

  public atualizarTimeline() {
    this.bdService.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes
        console.log(this.publicacoes)
      })
  }

}
