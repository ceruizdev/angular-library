import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
    
  }

  getCategories(page:number , rows:number):Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.url_service}/category/${page}/${rows}`);
  }

  saveCategory(category: Category): Observable<Response>{
    return this.http.post(`${environment.url_service}/category`, category).pipe(
      map((response:any) => response)
    );
  }

  getCategoryById(id:number): Observable<Category>{
    return this.http.get<Category>(`${environment.url_service}/category/${id}`);
  }

  deleteCategory(id: number){
    return this.http.delete(`${environment.url_service}/category/${id}`);
  }

  editCategory(user:Category): Observable<Response>{
    return this.http.put(`${environment.url_service}/category`, user).pipe(
      map((response:any) => response)
    );
  }

}
