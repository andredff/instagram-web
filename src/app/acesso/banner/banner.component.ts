import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      // transition('visivel => escondido', animate('1s ease-in'))

    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido';

  constructor() { }

  ngOnInit() {

    setInterval(()=> {
      this.estado = 'visivel'
    }, 1000);
    setInterval(()=> {
      this.estado = 'escondido'
    }, 6000);

  }

}
