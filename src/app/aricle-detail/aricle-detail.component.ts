import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UploadService } from 'src/app/service/upload/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ArticleService } from 'src/app/service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TokenStorageService} from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-aricle-detail',
  templateUrl: './aricle-detail.component.html',
  styleUrls: ['./aricle-detail.component.css']
})
export class AricleDetailComponent implements OnInit {

  currentArticle: any;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  article_id = 1;
  

  constructor(private uploadService: UploadService, private articleService: ArticleService, private route: ActivatedRoute, private router: Router,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.getArticle(this.route.snapshot.paramMap.get('id'));
    this.fileInfos = this.uploadService.getFilesByArticle(this.article_id);
  }

  getArticle(id): void {
    this.articleService.getTutorial(id)
      .subscribe(
        data => {
          this.currentArticle = data;
          this.article_id = data.id;
          console.log(data);
        },
        err => {
          console.log(err);
        });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile,this.token.getUser().id,this.article_id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFilesByArticle(this.article_id);
        }
      },
      err => {
        this.progress = 0;
        this.message = "Could not upload this file";
        this.currentFile = undefined;
      }
    );
    this.selectedFiles = undefined;
  }


}
