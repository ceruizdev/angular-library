import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BooksComponent } from './components/books/books.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component'

import { RouteModule } from './route.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthHttpInterceptor } from './auth/AuthHttpInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatPaginatorModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { NewAuthorComponent } from './components/authors/new-author/new-author.component';
import { EditAuthorComponent } from './components/authors/edit-author/edit-author.component';
import { NewCategoryComponent } from './components/categories/new-category/new-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { NewBookComponent } from './components/books/new-book/new-book.component';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BooksComponent,
    CategoriesComponent,
    AuthorsComponent,
    UsersComponent,
    HomeComponent,
    SignupComponent,
    LogoutComponent,
    NewUserComponent,
    EditUserComponent,
    NewAuthorComponent,
    EditAuthorComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    NewBookComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AuthGuard, AuthService,{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    NewUserComponent, 
    EditUserComponent, 
    NewAuthorComponent, 
    EditAuthorComponent, 
    NewCategoryComponent, 
    EditCategoryComponent,
    NewBookComponent,
    EditBookComponent]
})
export class AppModule { }
