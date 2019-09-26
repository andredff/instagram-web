import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from './../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  exibirPainelCadastro(){
    this.exibirPainel.emit('cadastro');
  }

  autenticar() {
    console.log(this.formulario)
    this.authService.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
  }

}
