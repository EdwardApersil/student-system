import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Intern } from '../interface/intern';
import { Admin } from '../interface/admin';
import { LineManager } from '../interface/linemanager';



@Injectable({
  providedIn: 'root'
})

export class StudentService {
  INTERN_API_URL = 'http://localhost:3000/interns';
  ADMIN_API_URL = 'http://localhost:3000/admins';
  LINE_MANAGER_API_URL = 'http://localhost:3000/lineManagers';
  AUTH_API_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  // Get all interns
  getInterns(): Observable<Intern[]> {
    return this.http.get<Intern[]>(this.INTERN_API_URL).pipe(
      catchError((error) => {
        console.error('Error getting interns:', error);
        return throwError(() => new Error('Error getting interns, please try again later.'));
      })
    );
  }

  // Get an intern by ID
  getIntern(id: string): Observable<Intern> {
    return this.http.get<Intern>(`${this.INTERN_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error getting intern:', error);
        return throwError(() => new Error('Error getting intern, please try again later.'));
      })
    );
  }

  // Create a new intern
  createIntern(intern: Intern): Observable<Intern> {
    return this.http.post<Intern>(this.INTERN_API_URL, intern).pipe(
      catchError(error => {
        console.error('Error creating intern:', error);
        return throwError(() => new Error('Error creating intern, please try again later.'));
      })
    );
  }

  // Update an existing intern
  updateIntern(id: string, updatedIntern: Intern): Observable<Intern> {
    return this.http.patch<Intern>(`${this.INTERN_API_URL}/${id}`, updatedIntern).pipe(
      catchError(error => {
        console.error('Error updating intern:', error);
        return throwError(() => new Error('Error updating intern, please try again later.'));
      })
    );
  }

  // Delete an intern
  deleteIntern(id: string): Observable<void> {
    return this.http.delete<void>(`${this.INTERN_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting intern:', error);
        return throwError(() => new Error('Error deleting intern, please try again later.'));
      })
    );
  }

  // Search interns
  searchInterns(searchText: string): Observable<Intern[]> {
    return this.http.get<Intern[]>(`${this.INTERN_API_URL}?search=${searchText}`).pipe(
      catchError((error) => {
        console.error('Error searching interns:', error);
        return throwError(() => new Error('Error searching interns, please try again later.'));
      })
    );
  }

  // Get an admin by ID
  getAdmin(id: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.ADMIN_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error getting admin:', error);
        return throwError(() => new Error('Error getting admin, please try again later.'));
      })
    );
  }

  // Get all line managers
  getLineManagers(): Observable<LineManager[]> {
    return this.http.get<LineManager[]>(this.LINE_MANAGER_API_URL).pipe(
      catchError((error) => {
        console.error('Error getting line managers:', error);
        return throwError(() => new Error('Error getting line managers, please try again later.'));
      })
    );
  }

  // Get a line manager by ID
  getLineManager(id: string): Observable<LineManager> {
    return this.http.get<LineManager>(`${this.LINE_MANAGER_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error getting line manager:', error);
        return throwError(() => new Error('Error getting line manager, please try again later.'));
      })
    );
  }

  // Create a new line manager
  createLineManager(lineManager: LineManager): Observable<LineManager> {
    return this.http.post<LineManager>(this.LINE_MANAGER_API_URL, lineManager).pipe(
      catchError(error => {
        console.error('Error creating line manager:', error);
        return throwError(() => new Error('Error creating line manager, please try again later.'));
      })
    );
  }

  // Update an existing line manager
  updateLineManager(id: string, updatedLineManager: LineManager): Observable<LineManager> {
    return this.http.patch<LineManager>(`${this.LINE_MANAGER_API_URL}/${id}`, updatedLineManager).pipe(
      catchError(error => {
        console.error('Error updating line manager:', error);
        return throwError(() => new Error('Error updating line manager, please try again later.'));
      })
    );
  }

  // Delete a line manager
  deleteLineManager(id: string): Observable<void> {
    return this.http.delete<void>(`${this.LINE_MANAGER_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting line manager:', error);
        return throwError(() => new Error('Error deleting line manager, please try again later.'));
      })
    );
  }


}
