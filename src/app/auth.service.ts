import { Usuario } from './acesso/usuario.model';

export class AuthService{
  public cadastrarUsuario(usuario: Usuario) {
    console.log('usuario cadastrado', usuario)
  }
}
