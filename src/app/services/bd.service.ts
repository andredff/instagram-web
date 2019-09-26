import * as firebase from 'firebase';

export class BdService {
  public publicar(publicacao: any) {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push( { titulo: publicacao.titulo } )

    console.log(publicacao)
    console.log('chegamos ate o servico de dados');
  }
}
