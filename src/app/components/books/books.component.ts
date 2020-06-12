import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { MatDialog } from '@angular/material';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books:Book[]=[];
  records: number = 0;
  pageSizeOptions:number[] = [10,20,30];
  pageSize: number = 10;
  pageIndex: number = 0;
  BuscadorForm: FormGroup;
  pagination:Boolean = true;

  constructor(private bookService:BookService,private authorService:AuthorService,
            private categoryService: CategoryService, public dialog: MatDialog,
            private fb: FormBuilder) { }

  ngOnInit() {
    this.getBooks(1,this.pageSize);
    this.buildUserForm();
  }


  buildUserForm(){
    this.BuscadorForm = this.fb.group({
      tipoFiltro:['',[Validators.required]],
      filtro:['',[Validators.required]],
    });
  }

  getBooks(page: number, rows:number){
    this.bookService.getBooks(page, rows).subscribe(
      response =>
      {
        this.books = response;
        this.records = response[0].totalRecords;
      }
    );
  }

  newBook(){
    const dialogRef = this.dialog.open(NewBookComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks(1,this.pageSize);
    });
  }

  updateBook(id:number){
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '500px',
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks(1,this.pageSize);
    });
  }

  deleteBook(id:number){
    this.bookService.deleteBook(id).subscribe(() => this.getBooks(1,this.pageSize));
  }

  changePage(event: any): void{
    this.getBooks(event.pageIndex + 1, event.pageSize);
  }

  buscar(){
    if(this.BuscadorForm.dirty && this.BuscadorForm.valid){
     const tipoFiltro = this.BuscadorForm.value.tipoFiltro
     const filtro = this.BuscadorForm.value.filtro
     this.bookService.filterBook(tipoFiltro, filtro).subscribe(
      response =>
      {
        this.pagination = false;
        this.books = response;
        //this.records = response[0].totalRecords;
      }
    );
  }
  }
}
