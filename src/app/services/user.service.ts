import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    
  }

  getUsers(page:number , rows:number):Observable<User[]>{
    return this.http.get<User[]>(`${environment.url_service}/user/${page}/${rows}`);
  }

  saveUser(user: User): Observable<Response>{
    return this.http.post(`${environment.url_service}/user`, user).pipe(
      map((response:any) => response)
    );
  }

  getUserById(id:number): Observable<User>{
    return this.http.get<User>(`${environment.url_service}/user/${id}`);
  }

  deleteUser(id: number){
    return this.http.delete(`${environment.url_service}/user/${id}`);
  }

  editUser(user:User): Observable<Response>{
    return this.http.put(`${environment.url_service}/user`, user).pipe(
      map((response:any) => response)
    );
  }
}
