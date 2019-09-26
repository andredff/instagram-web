import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

import { AuthService } from './../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('form-error', [
      transition('initial <=> final', [
        animate('1000ms 0s ease', keyframes([
          style({ offset: 0, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.20, opacity: 1, transform: 'translateX(-10px)' }),
          style({ offset: 0.40, opacity: 1, transform: 'translate(10px)' }),
          style({ offset: 0.60, opacity: 1, transform: 'translateX(-10px)' }),
          style({ offset: 0.80, opacity: 1, transform: 'translateX(10px)' }),
          style({ offset: 1, opacity: 1, transform: 'translateX(0)' })
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formError = 'initial';

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
      this.formError = this.formError === 'initial' ? 'final' : 'initial';

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
