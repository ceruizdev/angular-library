import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService]
})
export class UsersComponent implements OnInit {
  users:User[]=[];
  records: number = 0;
  pageSizeOptions:number[] = [10,20,30];
  pageSize: number = 10;
  pageIndex: number = 0;
  constructor(private userService:UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers(1,this.pageSize);
  }

  getUsers(page: number, rows:number){
    this.userService.getUsers(page, rows).subscribe(
      response =>
      {
        this.users = response;
        this.records = response[0].totalRecords;
      }
    );
  }
 
  newUser(){
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers(1,this.pageSize);
    });
  }

  updateUser(id:number){
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers(1,this.pageSize);
    });
  }

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(() => this.getUsers(1,this.pageSize));
  }

  changePage(event: any): void{
    this.getUsers(event.pageIndex + 1, event.pageSize);
  }
}
