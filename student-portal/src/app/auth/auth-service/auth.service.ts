import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private INTERN_API_URL = 'http://localhost:3000/interns';
  private LINE_MANAGER_API_URL = 'http://localhost:3000/lineManagers';
  private ADMIN_API_URL = 'http://localhost:3000/admins';

  currentUser: any;

  constructor(private http: HttpClient) { }

  loginAuth(auth: {username: string, password: string, role: string}): Observable<any> {
    let url = ''

    switch (auth.role){
      case 'intern':
        url = this.INTERN_API_URL;
        break;
      case 'lineManager':
        url = this.LINE_MANAGER_API_URL;
        break;
      case 'admin':
        url = this.ADMIN_API_URL;
        break;
      default:
        return throwError(`Invalid role ${auth.role}`);

    }

    return this.http.get<Auth[]>(url).pipe(
      map(users => {
        const user = users.find(u => u.username === auth.username && u.password === auth.password && u.role === auth.role)
        if(user){
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }else{
          return null;
        }
      })
    )

  }
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
