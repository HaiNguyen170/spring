import { Component, OnInit } from '@angular/core';
import {ArticleService} from 'src/app/service/article.service';
import {TokenStorageService} from '../service/token-storage.service';
import {ToastService} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit { 
  tomorrow :any;

  form : any = {
    title:null,
    created_date:null,
    expired_date:null,
    active:false,
    falcuty:null,
    userid : this.token.getUser().id
  }

  constructor(private articleService : ArticleService
    ,private token : TokenStorageService) { }

  ngOnInit(): void {
    this.validateExpiredDate();
  }

  validateExpiredDate(){
    const today = new Date();
    this.tomorrow = new Date(today.getDate()+1);
  }

  onSubmit(){ 
    
  }

}
