import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_API_URL = 'http://localhost:3000/auth';
  currentUser: any;

  constructor(private http: HttpClient) { }

  loginAuth(auth: { username: string, password: string, role: string }): Observable<any> {
    return this.http.get<any[]>(this.AUTH_API_URL).pipe(
      map(users => {
        console.log('Users:', users);  
        const user = users.find(u => u.username === auth.username || u.password === auth.password || u.role === auth.role);
        if (user) {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        } else {
          return null;
        }
      })
    );
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
