import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'instagram';

  ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyDySJSZ-RLiIm03xWaq-tTjSPw6g5hgnMw",
      authDomain: "jta-instagram-clone-ffc6c.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-ffc6c.firebaseio.com",
      projectId: "jta-instagram-clone-ffc6c",
      storageBucket: "",
      messagingSenderId: "454821760364",
      appId: "1:454821760364:web:1c2213ad4c7208132bf749"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
