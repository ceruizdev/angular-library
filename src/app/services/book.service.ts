import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
    
  }

  getBooks(page:number , rows:number):Observable<Book[]>{
    return this.http.get<Book[]>(`${environment.url_service}/book/${page}/${rows}`);
  }

  saveBook(book: Book): Observable<Response>{
    return this.http.post<Book>(`${environment.url_service}/book`, book).pipe(
      map((response:any) => response)
    );
  }

  getBookById(id:number): Observable<Book>{
    console.log(`${environment.url_service}/book/${id}`);
    return this.http.get<Book>(`${environment.url_service}/book/${id}`);
  }

  deleteBook(id: number){
    return this.http.delete(`${environment.url_service}/book/${id}`);
  }

  editBook(book:Book): Observable<Response>{
    return this.http.put(`${environment.url_service}/book`, book).pipe(
      map((response:any) => response)
    );
  }

  filterBook(type:number , filter:string):Observable<Book[]>{
    return this.http.get<Book[]>(`${environment.url_service}/book/filter/${type}/${filter}`);
  }
}
