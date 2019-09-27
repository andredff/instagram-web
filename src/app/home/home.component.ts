import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes', {static: false}) public publicacoes: any

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public sair() {

    this.authService.sair();

  }

  public atualizarTimeLine() {
    console.log('chegamo aqui')
    this.publicacoes.atualizarTimeLine();
  }

}
