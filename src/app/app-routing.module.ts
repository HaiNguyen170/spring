import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { MagTableComponent } from './mag-table/mag-table.component';
import { StatisticComponent } from './statistic/statistic.component';
import { SubmitComponent } from './submit/submit.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FileComponent } from './file/file.component';
import { ArticleComponent } from './article/article.component';
import { AricleDetailComponent } from './aricle-detail/aricle-detail.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Submit', component: SubmitComponent },
  { path: 'Statistic', component: StatisticComponent },
  { path: 'Error', component: ErrorComponent },
  { path: 'Table', component: DataTableComponent },
  { path: 'Mag-Table', component: MagTableComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Uploadfile', component: FileComponent },
  { path: 'Article', component: ArticleComponent },
  { path: 'Article-Detail/:id', component: AricleDetailComponent },
  { path: 'User', component: UserComponent },
  { path: 'User-Detail/:id', component: UserDetailComponent },
  { path: 'Article-Create', component: ArticleCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
