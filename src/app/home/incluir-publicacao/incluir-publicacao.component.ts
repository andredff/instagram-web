import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BdService } from './../../services/bd.service';
import * as firebase from 'firebase';
import { ProgressService } from 'src/app/services/progress.service';

import { Observable, Subject, interval } from 'rxjs'

import { map, tap, takeUntil } from 'rxjs/operators';

// import 'rxjs/Rx';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email: string;
  public imagem;
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),

  })

  constructor(private bdService: BdService, private progress: ProgressService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
      // console.log(this.email)
    })
  }

  public publicar() {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload = interval(1500)
    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        // console.log(this.progress.status)
        // console.log(this.progress.estado)
        this.progressoPublicacao = 'andamento'
        this.porcentagemUpload = Math.round((this.progress.estado.bytesTransferred / this.progress.estado.totalBytes) * 100)

        if (this.progress.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          //emitir evento do component parent (home)
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
      })

  }

  public preparaImagemUpload(event: Event) {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
