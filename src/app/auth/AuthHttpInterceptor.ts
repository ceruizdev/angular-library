import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const jwt = this.authService.getToken();
        const authRequest = req.clone({ setHeaders: { Authorization: `Bearer ${jwt}`}});
        return next.handle(authRequest).pipe(
            catchError((error) => {
              if(error.status === 401){
                  this.router.navigate(['/login']);
              }
              return throwError(error);
            })
          );;
    }
}


