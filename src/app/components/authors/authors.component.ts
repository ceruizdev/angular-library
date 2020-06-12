import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';
import { MatDialog } from '@angular/material';
import { NewAuthorComponent } from './new-author/new-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors:Author[]=[];
  records: number = 0;
  pageSizeOptions:number[] = [10,20,30];
  pageSize: number = 10;
  pageIndex: number = 0;
  constructor(private authorService:AuthorService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAuthors(1,this.pageSize);
  }

  getAuthors(page: number, rows:number){
    this.authorService.getAuthors(page, rows).subscribe(
      response =>
      {
        this.authors = response;
        this.records = response[0].totalRecords;
      }
    );
  }

  newAuthor(){
    const dialogRef = this.dialog.open(NewAuthorComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAuthors(1,this.pageSize);
    });
  }

  updateAuthor(id:number){
    const dialogRef = this.dialog.open(EditAuthorComponent, {
      width: '500px',
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAuthors(1,this.pageSize);
    });
  }

  deleteAuthor(id:number){
    this.authorService.deleteAuthor(id).subscribe(() => this.getAuthors(1,this.pageSize));
  }

  changePage(event: any): void{
    this.getAuthors(event.pageIndex + 1, event.pageSize);
  }

}
