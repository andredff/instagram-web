import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Usuario } from './../usuario.model';
import { AuthService } from './../../auth.service';

import { ToastService } from './../../shared/toast.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  });

  usuario: Usuario;

  constructor(private authService: AuthService, private toastService: ToastService) { }

  ngOnInit() {

  }


  exibirPainelLogin(){
    this.exibirPainel.emit('login');
  }

  cadastrarusuario(){

    this.usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha,
    );

    this.authService.cadastrarUsuario(this.usuario)
      .then(() => {
        this.toastService.toast.fire({
          type: 'success',
          title: 'Cadastrado com sucesso!'
        });
        this.exibirPainelLogin()
      })
      .catch(() => {
        this.toastService.toast.fire({
          type: 'error',
          title: 'Ocorrou um erro imprevisto'
        });
      })


  }

}
