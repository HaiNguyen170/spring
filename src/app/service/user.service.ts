import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const API_USER = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUser(): Observable<any> {
    return this.http.get(API_USER);
  }

  updateUser(user_id, data): Observable<any> {
    return this.http.put(API_USER + `/${user_id}`, data);
  }

  getUser(user_id): Observable<any> {
    return this.http.get(API_USER + `/${user_id}`);
  }

  deleteUser(user_id):Observable<any>{
    return this.http.delete(API_USER+`/${user_id}`);
  }


  updateById(id, payload) {
    let url = `http://localhost/repos/Sportaz-repo/VaamozWeb/VaamozBusiness/RestApi/VaamozStore/AdminStore/angular_admin/php/index.php?id=${id}`
    return this.http.put(url, payload);
  }
}