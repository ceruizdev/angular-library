import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { EditAuthorComponent } from './components/authors/edit-author/edit-author.component';
import { NewAuthorComponent } from './components/authors/new-author/new-author.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'authors', component:AuthorsComponent, canActivate: [AuthGuard]},
  {path:'books', component:BooksComponent, canActivate: [AuthGuard]},
  {path:'categories', component:CategoriesComponent, canActivate: [AuthGuard]},
  {path:'users', component:UsersComponent, canActivate: [AuthGuard]},
  {path:'home', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'logout', component:LogoutComponent},
  {path: '**', redirectTo:"/home", pathMatch:'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
  entryComponents:[EditUserComponent,NewUserComponent, EditAuthorComponent,NewAuthorComponent]
})
export class RouteModule { }
