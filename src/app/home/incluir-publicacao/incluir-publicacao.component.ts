import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BdService } from './../../services/bd.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),

  })

  constructor(private bdService: BdService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
      console.log(this.email)
    })
  }

  public publicar() {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo
    })
  }

}
