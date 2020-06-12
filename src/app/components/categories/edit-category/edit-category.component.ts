import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DialogData{
  id:number;
}


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm: FormGroup;
  category: Category;
  constructor(private fb: FormBuilder, 
    private categoryService:CategoryService,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
      
    ) { 
      this.updateCategory(data.id);
    }

    ngOnInit() {
      this.buildUserForm();
    }

    buildUserForm(){
      this.editCategoryForm = this.fb.group({
        name:['',[Validators.required]]
      });
    }
  
    updateCategory(id:number){
      this.categoryService.getCategoryById(id).subscribe(
        response => {
          this.category = response;
          this.editCategoryForm.patchValue(
            {
              name:response.name,
            }
          );
        }
      );
    }

    saveCategory(){
      if(this.editCategoryForm.dirty && this.editCategoryForm.valid){
        const values =  Object.assign({}, this.category, this.editCategoryForm.value);
        this.categoryService.editCategory(values).subscribe(
          response => {
            this.dialogRef.close();
          }
        );
      }else if (!this.editCategoryForm.dirty){
        this.editCategoryForm.reset();
      }
    }

}
