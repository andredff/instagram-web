import { keyframes } from '@angular/animations';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ProgressService } from './progress.service';
import { once } from 'cluster';

@Injectable()
export class BdService {

  constructor(private progress: ProgressService) { }

  public publicar(publicacao: any) {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((res: any) => {
        console.log(res.key)

        let nomeImagem = res.key;

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            // acompanhamento do progresso do upload
            (snapshot: any) => {
              this.progress.status = 'uploading'
              this.progress.estado = snapshot
              // console.log(snapshot)

            }, (error) => {
              this.progress.status = 'erro'
              console.log(error)
            },
            () => {
              // finalizacao do processo
              this.progress.status = 'concluido'
              console.log('upload completo')

            }
          )
      })

  }

  public consultaPublicacoes(emailusuario: string): Promise<any> {

    return new Promise((resolve, reject) => {

      firebase.database().ref(`publicacoes/${btoa(emailusuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {

          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {

            let publicacao = childSnapshot.val()
            publicacao.key = childSnapshot.key

            publicacoes.push(publicacao)
          })

          return publicacoes.reverse()
          // resolve(publicacoes)
        })
        .then((publicacoes) => {
          // console.log(publicacoes)

          publicacoes.forEach((publicacao) => {
            // // consultar url imagem/
            firebase.storage().ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                // console.log(url)
                publicacao.url_imagem = url

                // consultar nome do usuario
                firebase.database().ref(`usuario_detalhe/${btoa(emailusuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario
                  })
              })
          })
          resolve(publicacoes)
        })
    })
  }



}
