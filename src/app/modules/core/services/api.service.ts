import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../user/interfaces/user.interface';

@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  fetchUsers(page): Observable<any> {
    return this.http.get('https://reqres.in/api/users?page=' + page).pipe(map(response => response.json()));
  }

  fetchUserById(id: number): Observable<UserInterface> {
    return this.http.get(`https://reqres.in/api/users/${id}`).pipe(map(response => response.json().data));
  }

}
