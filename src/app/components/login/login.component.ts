import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logOut();
    this.buildLoginForm();
  }

  buildLoginForm():void{
    this.loginForm = this.fb.group(
      {
        email:['',[Validators.required, Validators.email]],
        password: ['',[Validators.required,Validators.minLength(5), Validators.maxLength(30)]]
      }
    ); 
  }

  login(formData: FormGroup){
    this.authService.login(formData.value.email, formData.value.password)
    .subscribe(authResponse => {
      this.router.navigate(['/home']);
    }, error => this.loginError = error);
  }
}
