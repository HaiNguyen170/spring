import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8080/api/articles'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAllTutorial(): Observable<any> {
    return this.http.get(baseURL);
  }

  getTutorial(id): Observable<any> {
    return this.http.get(`${baseURL}/${id}`);
  }

  createTutorial(data): Observable<any> {
    return this.http.post(baseURL, data);
  }
}
