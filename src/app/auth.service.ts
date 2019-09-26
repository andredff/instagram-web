import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class AuthService{

  public tokenId: string;

  public cadastrarUsuario(usuario: Usuario): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
    .then((res: any) => {
      // console.log(res)
      // remove senha do atributo senha do objeto usuario
      delete usuario.senha;

      // registrando dados complementares do usuario no path do email na base64
      firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
        .set(usuario)
    })
    .catch((error: Error) => {
      // console.log(error)
    })
  }

  public autenticar(email: string, senha: string) {
    console.log(email, senha)
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((res: any) => {
        firebase.auth().currentUser.getIdToken()
          .then((idToken: string) => {
            this.tokenId = idToken;
            console.log(this.tokenId)
          })
      })
      .catch((error: Error) => console.log(error))
  }
}
