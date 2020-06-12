import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular8Project';
  loggedUser: boolean = false;
  constructor(private authService: AuthService){

  }
  ngOnInit(){
    this.authService.authStatus.subscribe(
      authStatus => {
        const jwt = this.authService.getToken();
        setTimeout(() => (this.loggedUser = !(jwt == null || jwt === ''),0));
      }
    );
  }

  showUserOptions(){
    return this.loggedUser;
  }
}

