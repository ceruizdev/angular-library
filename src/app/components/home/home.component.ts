import { Component, OnInit } from '@angular/core';
import  Typed  from 'typed.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUser: boolean = false;
  name: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.getToken() == null || this.authService.getToken() === ''){
      this.loggedUser = true;
    }else{
      this.loggedUser = false;
      this.authService.authStatus.subscribe(
        data => {
          this.name = data.unique_name;
        }
      );
    }
    var typed = new Typed(".auto-complete", {
      strings: ["Consulta gran variedad de libros y autores <br />Bienvenid@!"],
      smartBackspace: true ,// Default value,
      typeSpeed: 40
     });
  }

}
