import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  newCategoryForm: FormGroup;
  category: Category;

  constructor(private fb: FormBuilder, 
              private categoryService: CategoryService,
              private dialogRef: MatDialogRef<NewCategoryComponent>) { }

  ngOnInit() {
    this.buildUserForm();
  }

  buildUserForm(){
    this.newCategoryForm = this.fb.group({
      name:['',[Validators.required]]
    });
  }

  saveCategory(){
    if(this.newCategoryForm.dirty && this.newCategoryForm.valid){
      const values =  Object.assign({}, this.category, this.newCategoryForm.value);
      this.categoryService.saveCategory(values).subscribe(
        response => {
          this.dialogRef.close();
        }
      );
    }else if (!this.newCategoryForm.dirty){
      this.newCategoryForm.reset();
    }
  }

}
