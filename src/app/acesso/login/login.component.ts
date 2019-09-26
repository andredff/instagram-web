import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  invalidUser: boolean;
  invalidPass: boolean;

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.required),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro');
  }

  autenticar() {
    this.invalidPass = false;
    this.invalidUser = false;

    if (this.formulario.invalid) {
      this.formulario.get('email').markAsTouched()
      this.formulario.get('senha').markAsTouched()
    } else {
      this.authService.autenticar(this.formulario.value.email, this.formulario.value.senha)
        .then(() => {
          console.log('logando')
        })
        .catch(erro => {
          if (erro.code === 'auth/invalid-email') {
            this.invalidUser = true;
            console.log('usuario invalido')
          }
          if (erro.code === 'auth/wrong-password') {
            this.invalidPass = true;
            console.log('senha invalida')
          }

        })
    }
  }
}
