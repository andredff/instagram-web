import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in')),

    ])
  ]
})
export class BannerComponent implements OnInit {

  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/img/banner/img_0.png' },
    { estado: 'escondido', url: '/assets/img/banner/img_2.png' },
    { estado: 'escondido', url: '/assets/img/banner/img_3.png' },
    { estado: 'escondido', url: '/assets/img/banner/img_4.png' },
    { estado: 'escondido', url: '/assets/img/banner/img_5.png' },
  ];

  constructor() { }

  ngOnInit() {

    setTimeout(() => this.logicaRotacao(), 2000);

  }
  public logicaRotacao() {

    // auxilia na exibicao da imagem seguinte
    let idx: number;

    // ocultar imagem
    for (let i = 0; i <= 4; i++){

      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';
        idx = i === 4 ? 0 : ++i;
        break;
      }
    }

    // exibir proxima imagem
    this.imagens[idx].estado = 'visivel';

    setTimeout(() => this.logicaRotacao(), 3000);
  }

}
