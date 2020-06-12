import { Injectable } from '@angular/core';
import { Role } from '../auth/role.enum';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import * as decode from 'jwt-decode';
import { throwError, concat, of } from 'rxjs';
import { TransformError } from '../common/common';
import { CacheService } from '../auth/cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {
  private readonly authProvider:(email: string, password: string) => Observable<IServerAuthResponse>;
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus) 

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private httpClient: HttpClient) {
    super();
    this.authStatus.subscribe(authStatus => {
      this.setItem('authStatus',authStatus);
    }
    );
    this.authProvider = this.userAuthProvider;
  }
  private
   userAuthProvider(email:string, password:string):Observable<IServerAuthResponse>{
    return this.httpClient.post<IServerAuthResponse>(
      `${environment.url_service}/token`,{email: email, password: password}, this.httpOptions
    );
  }
  login(email: string, password: string):Observable<IAuthStatus>{
    this.logOut();
    const loginResponse = this.userAuthProvider(email, password).pipe(
      map(value => {  
        this.setToken(value.accessToken);   
        const result = decode(value.accessToken);
        return result as IAuthStatus;
      }), catchError(TransformError)
    );
    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      }, err => {
        this.logOut();
        return throwError(err);
      }
    );
    return loginResponse;
  }

  logOut(){
    this.authStatus.next(defaultAuthStatus);
    this.clearToken();
  }

  private setToken(jwt: string){
    this.setItem('jwt', jwt);
  }

  getToken():string{
    return this.getItem('jwt') || '';
  }

  private clearToken(){
    this.removeItem('jwt');
  }
  getAuthStatus(): IAuthStatus{
    return this.getItem('authStatus');
  }
}
export interface IAuthStatus{
  unique_name: string;
  email: string;
  role: Role;  
}

interface IServerAuthResponse{
  accessToken: string;
}

const defaultAuthStatus: IAuthStatus = {
  role:Role.none,
  email: null,
  unique_name: null 
}

