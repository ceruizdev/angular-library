import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SpaceValidator } from '../../shared/validators'; 
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private dialogRef: MatDialogRef<NewUserComponent>) { }

  ngOnInit() {
    this.buildUserForm();
  }

  buildUserForm(){
    this.newUserForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required, SpaceValidator.canNotContainSpace, Validators.email]],
      password:['',[Validators.required,Validators.minLength(5), Validators.maxLength(30)]],
      userTypeFK:['',[Validators.required]]
    });
  }

  saveUser(){
    if(this.newUserForm.dirty && this.newUserForm.valid){
      const values =  Object.assign({}, this.user, this.newUserForm.value);
      this.userService.saveUser(values).subscribe(
        response => {
          this.dialogRef.close();
        }
      );
    }else if (!this.newUserForm.dirty){
      this.newUserForm.reset();
    }
  }
}
