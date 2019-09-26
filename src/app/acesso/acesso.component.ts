import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-60px, 0)' }),
        animate('600ms 0s ease-in-out') // ducarao, delay e aceleracao
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(60px, 0)' }),
        animate('600ms 0s ease-in-out')

        // animate('1500ms 0s ease-in-out', keyframes([
        //   style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
        //   style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),

        //   style({ offset: 0.88, opacity: 1, transform: 'translate(-10px)' }),
        //   style({ offset: 0.90, opacity: 1, transform: 'translateX(10px)' }),


        //   style({ offset: 1, opacity: 1, transform: 'translateX(0)' })
        // ])) // ducarao, delay e aceleracao
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner = 'criado';
  public estadoPainel = 'criado';

  public cadastro = false;

  constructor() { }

  ngOnInit() {
  }

  exibirPainel(event: string) {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  inicioAnimacao(){
    // console.log('inicio animacao')
  }

  fimAnimacao(){
    // console.log('fim animacao')
  }

}
