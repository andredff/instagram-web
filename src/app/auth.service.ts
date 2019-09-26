import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { reject, resolve } from 'q';
import { promise } from 'protractor';

@Injectable()
export class AuthService {

  public tokenId: string;

  constructor(private router: Router) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((res: any) => {
        // console.log(res)
        // remove senha do atributo senha do objeto usuario
        delete usuario.senha;

        // registrando dados complementares do usuario no path do email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)
        resolve({ success: true })
      })
      .catch((error: Error) => {
        console.log(error)
        reject(error);
      })
    })
  }

  public autenticar(email: string, senha: string): Promise<any> {
    // console.log(email, senha)

    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, senha)

        .then((res: any) => {
          firebase.auth().currentUser.getIdToken()
            .then((idToken: string) => {
              this.tokenId = idToken;
              localStorage.setItem('idToken', idToken);
              this.router.navigate(['/home'])
              resolve({ success: true })
            });
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  public autenticado(): boolean {

    if (this.tokenId === undefined && localStorage.getItem('idToken') != null) {
      this.tokenId = localStorage.getItem('idToken');
    }

    if (this.tokenId === undefined) {
      this.router.navigate(['/']);
    }

    return this.tokenId !== undefined;
  }

  public sair() {

    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        this.tokenId = undefined;
        this.router.navigate(['/']);

      })
  }

}
