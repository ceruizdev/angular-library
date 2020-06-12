import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SpaceValidator } from '../../shared/validators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData{
  id:number;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers:[UserService]
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user: User;
  constructor(private fb: FormBuilder, 
    private userService:UserService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
      
    ) { 
      this.updateUser(data.id);
    }

  ngOnInit() {
    this.buildUserForm();
  }

  buildUserForm(){
    this.editUserForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(5), Validators.maxLength(30)]],
      userTypeFK:['',[Validators.required]]
    });
  }

  updateUser(id:number){
    this.userService.getUserById(id).subscribe(
      response => {
        this.user = response;
        this.editUserForm.patchValue(
          {
            firstName:response.firstName,
            lastName:response.lastName,
            email:response.email,
            userTypeFK: response.userTypeFK
          }
        );
      }
    );
  }

  saveUser(){
    if(this.editUserForm.dirty && this.editUserForm.valid){
      const values =  Object.assign({}, this.user, this.editUserForm.value);
      this.userService.editUser(values).subscribe(
        response => {
          this.dialogRef.close();
        }
      );
    }else if (!this.editUserForm.dirty){
      this.editUserForm.reset();
    }
  }

}
