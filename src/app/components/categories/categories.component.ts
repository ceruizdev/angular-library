import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MatDialog } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { NewCategoryComponent } from './new-category/new-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:Category[]=[];
  records: number = 0;
  pageSizeOptions:number[] = [10,20,30];
  pageSize: number = 10;
  pageIndex: number = 0;
  constructor(private categoryService:CategoryService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAuthors(1,this.pageSize);
  }

  getAuthors(page: number, rows:number){
    this.categoryService.getCategories(page, rows).subscribe(
      response =>
      {
        this.categories = response;
        this.records = response[0].totalRecords;
      }
    );
  }

  newCategory(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAuthors(1,this.pageSize);
    });
  }

  updateCategory(id:number){
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '500px',
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAuthors(1,this.pageSize);
    });
  }

  deleteCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe(() => this.getAuthors(1,this.pageSize));
  }

  changePage(event: any): void{
    this.getAuthors(event.pageIndex + 1, event.pageSize);
  }
}
