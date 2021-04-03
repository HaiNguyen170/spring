import { Component, OnInit } from '@angular/core';
import { ArticleService } from "src/app/service/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles : any[];
  constructor(private service: ArticleService) { }

  ngOnInit(): void {
    this.listTutorials();
  }

  async listTutorials(){
    await this.service.getAllTutorial()
    .subscribe(
      data=>{
        this.articles = data;
        console.log(data);
      },
      error=>{
        console.log(error);
      });
  }

}
