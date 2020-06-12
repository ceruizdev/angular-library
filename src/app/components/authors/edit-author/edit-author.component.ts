import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditUserComponent } from '../../users/edit-user/edit-user.component';
import { AuthorService } from 'src/app/services/author.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';


export interface DialogData{
  id:number;
}

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})

export class EditAuthorComponent implements OnInit {

  editAuthorForm: FormGroup;
  author: Author;
  constructor(private fb: FormBuilder, 
    private authorService:AuthorService,
    private dialogRef: MatDialogRef<EditAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
      
    ) { 
      this.updateAuthor(data.id);
    }

  ngOnInit() {
    this.buildUserForm();
  }

  buildUserForm(){
    this.editAuthorForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      age:['',[Validators.required]],
      nationality:['',[Validators.required]],
      birthdate:['',[Validators.required]],
      lifeStatus:['',[Validators.required]]
    });
  }

  updateAuthor(id:number){
    this.authorService.getAuthorById(id).subscribe(
      response => {
        console.log(response.lifeStatus);
        this.author = response;
        this.editAuthorForm.patchValue(
          {
            firstName:response.firstName,
            lastName:response.lastName,
            age:response.age,
            nationality:response.nationality,
            birthdate:response.birthdate,
            lifeStatus:response.lifeStatus ? 1: 0
          }
        );
      }
    );
  }

  saveAuthor(){
    if(this.editAuthorForm.dirty && this.editAuthorForm.valid){
      const values =  Object.assign({}, this.author, this.editAuthorForm.value);
      this.authorService.editAuthor(values).subscribe(
        response => {
          this.dialogRef.close();
        }
      );
    }else if (!this.editAuthorForm.dirty){
      this.editAuthorForm.reset();
    }
  }

}
