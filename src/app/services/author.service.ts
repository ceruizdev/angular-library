import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {
    
  }

  getAuthors(page:number , rows:number):Observable<Author[]>{
    return this.http.get<Author[]>(`${environment.url_service}/author/${page}/${rows}`);
  }

  saveAuthor(author: Author): Observable<Response>{
    return this.http.post(`${environment.url_service}/author`, author).pipe(
      map((response:any) => response)
    );
  }

  getAuthorById(id:number): Observable<Author>{
    return this.http.get<Author>(`${environment.url_service}/author/${id}`);
  }

  deleteAuthor(id: number){
    return this.http.delete(`${environment.url_service}/author/${id}`);
  }

  editAuthor(author:Author): Observable<Response>{
    return this.http.put(`${environment.url_service}/author`, author).pipe(
      map((response:any) => response)
    );
  }
}
