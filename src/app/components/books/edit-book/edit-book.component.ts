import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from 'src/app/services/book.service';
import { Category } from 'src/app/models/category';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/author';


export interface DialogData{
  id:number;
}

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  editBookForm: FormGroup;
  book: Book;
  categories: Category[];
  authors: Author[];

  constructor(private fb: FormBuilder, 
    private bookService:BookService,
    private categoryService:CategoryService,
    private authorService:AuthorService,
    private dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
      
    ) { 
      this.getAuthors();
      this.getCategories();
      this.updateBook(data.id);
    }

    ngOnInit() {
      this.buildUserForm();
    }

    buildUserForm(){
      this.editBookForm = this.fb.group({
        isbn:['',[Validators.required]],
        name:['',[Validators.required]],
        details:['',[Validators.required]],
        authorFk: ['',[Validators.required]],
        categoryFk: ['',[Validators.required]],
        publicationDate:['',Validators.required]
      });
    }
  
    updateBook(id:number){
      this.bookService.getBookById(id).subscribe(
        response => {
            this.editBookForm = this.fb.group({
            categoryFk: ['',Validators.required],
            authorFk: ['',Validators.required],
            isbn:[response.isbn,[Validators.required]],
            name:[response.name,[Validators.required]],
            details:[response.details,[Validators.required]],
            publicationDate:[response.publicationDate,Validators.required]
          });
          this.book = response;
          this.editBookForm.patchValue(
            {
              name:response.name,
              authorFk: response.authorFK,
              categoryFk: response.categoryFK
            }
          );
        }
      );
    }

    saveBook(){
      if(this.editBookForm.dirty && this.editBookForm.valid){
        const values =  Object.assign({}, this.book, this.editBookForm.value);
        this.bookService.editBook(values).subscribe(
          response => {
            this.dialogRef.close();
          }
        );
      }else if (!this.editBookForm.dirty){
        this.editBookForm.reset();
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
