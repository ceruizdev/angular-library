import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { MatDialogRef } from '@angular/material';
import { NewCategoryComponent } from '../../categories/new-category/new-category.component';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Author } from 'src/app/models/author';


@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  newBookForm: FormGroup;
  book: Book;
  authors: Author[];
  categories: Category[];

  constructor(private fb: FormBuilder, 
              private bookService: BookService,
              private authorService: AuthorService,
              private categoryService: CategoryService,
              private dialogRef: MatDialogRef<NewCategoryComponent>) { }

  ngOnInit() {
    this.getAuthors();
    this.getCategories();
    this.buildUserForm();
  }

  buildUserForm(){
    this.newBookForm = this.fb.group({
      isbn:['',[Validators.required]],
      name:['',[Validators.required]],
      details:['',[Validators.required]],
      authorFk: ['',[Validators.required]],
      categoryFk: ['',[Validators.required]],
      publicationDate:['',Validators.required]
    });
  }

  saveBook(){
    debugger;
    if(this.newBookForm.dirty && this.newBookForm.valid){
      const values =  Object.assign({}, this.book, this.newBookForm.value);

      this.bookService.saveBook(values).subscribe(
        response => {
          this.dialogRef.close();
        }
      );
    }else if (!this.newBookForm.dirty){
      this.newBookForm.reset();
    }
  }
  getAuthors(){
    this.authorService.getAuthors(0,0).subscribe(
      data => {this.authors = data}
    );
  }
  getCategories(){
    this.categoryService.getCategories(0,0).subscribe(
      data => {this.categories = data}
    );
  }
}
