import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { SubmitComponent } from './submit/submit.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { StatisticComponent } from './statistic/statistic.component';
import { ErrorComponent } from './error/error.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from './data-table/data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MagTableComponent } from './mag-table/mag-table.component';
import { ChartsModule } from 'ng2-charts';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { FileComponent } from './file/file.component';
import { ArticleComponent } from './article/article.component';
import { AricleDetailComponent } from './aricle-detail/aricle-detail.component';
import { UserComponent } from './user/user.component';
import {ToastModule} from 'ng-uikit-pro-standard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SubmitComponent,
    StatisticComponent,
    ErrorComponent,
    DataTableComponent,
    MagTableComponent,
    RegisterComponent,
    ProfileComponent,
    FileComponent,
    ArticleComponent,
    AricleDetailComponent,
    UserComponent,
    UserDetailComponent,
    ArticleCreateComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AngularFileUploaderModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSortModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    ToastModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
