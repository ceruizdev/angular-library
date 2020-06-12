import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {

  newAuthorForm: FormGroup;
  author: Author;

  constructor(private fb: FormBuilder, 
              private authorService: AuthorService,
              private dialogRef: MatDialogRef<NewAuthorComponent>) { }

  ngOnInit() {
    this.buildUserForm();
  }

  buildUserForm(){
    this.newAuthorForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      age:['',[Validators.required]],
      nationality:['',[Validators.required]],
      birthdate:['',[Validators.required]],
      lifeStatus:['',[Validators.required]]
    });
  }

  saveAuthor(){
    if(this.newAuthorForm.dirty && this.newAuthorForm.valid){
      const values =  Object.assign({}, this.author, this.newAuthorForm.value);
      this.authorService.saveAuthor(values).subscribe(
        response => {
          this.dialogRef.close();
        }
      );
    }else if (!this.newAuthorForm.dirty){
      this.newAuthorForm.reset();
    }
  }
}
