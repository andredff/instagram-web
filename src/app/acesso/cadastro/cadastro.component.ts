import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from './../usuario.model';
import { AuthService } from './../../auth.service';

import { ToastService } from './../../services/toast.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [
    trigger('form-error', [
      transition('initial <=> final', [
        animate('1000ms 0s ease-in-out', keyframes([
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

export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formError = 'initial';

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.required),
    'nome_completo': new FormControl(null, Validators.required),
    'nome_usuario': new FormControl(null, Validators.required),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  usuario: Usuario;

  constructor(private authService: AuthService, private toastService: ToastService) { }

  ngOnInit() {

  }


  exibirPainelLogin() {
    this.exibirPainel.emit('login');
  }

  cadastrarusuario() {

    this.usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha,
    );

    if (this.formulario.invalid) {
      this.formulario.get('email').markAsTouched()
      this.formulario.get('nome_completo').markAsTouched()
      this.formulario.get('nome_usuario').markAsTouched()
      this.formulario.get('senha').markAsTouched()
      this.formError = this.formError === 'initial' ? 'final' : 'initial';

    } else {
      this.authService.cadastrarUsuario(this.usuario)
        .then(() => {
          this.toastService.toast.fire({
            type: 'success',
            title: 'Cadastrado com sucesso!'
          });
          this.exibirPainelLogin()
        })
        .catch((erro) => {

          if (erro.code === 'auth/email-already-in-use') {
            this.toastService.toast.fire({
              type: 'error',
              title: 'O endereço de email já está em uso'
            });
          } else {
            this.toastService.toast.fire({
              type: 'error',
              title: 'Ocorrou um erro imprevisto'
            });
          }
        })

    }
  }

}
