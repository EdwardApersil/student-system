import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Student } from '../interface/student';



@Injectable({
  providedIn: 'root'
})

export class StudentService {
  STUDENT_API_URL = 'http://localhost:8080/api/v1/students';

  constructor(
    private http: HttpClient
  ) { }

  // Get all students
  getStudents(): Observable<any> {
    return this.http.get<any>(this.STUDENT_API_URL).pipe(
      catchError((error) => {
        console.error('Error getting students:', error);
        return throwError(() => new Error('Error getting students, please try again later.'));
      })
    );
  }

  getStudent(id: number): Observable<any> {
    return this.http.get<any>(`${this.STUDENT_API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error getting student:', error);
        return of({}); // Return an empty object or handle the error appropriately
      })
    );
  }

  // Create a new student
  createStudent(student: any): Observable<any> {
    return this.http.post<any>(this.STUDENT_API_URL, student).pipe(
      catchError(error => {
        console.error('Error creating student:', error);
        return of({}); // Return an empty object or handle the error as needed
      })
    );
  }

  // Update an existing student
  updateStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.STUDENT_API_URL}/${student.id}`, student).pipe(
      error => {
        console.log('Error updating student:', error);
        return of({});
      }
    )
  }

  // Delete a student
  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.STUDENT_API_URL}/${id}`).pipe(
      error => {
        console.log('Error deleting student:', error);
        return of({});
      }
    )
  }

  searchStudents(searchText: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.STUDENT_API_URL}?search=${searchText}`).pipe(
      catchError((error) => {
        console.error('Error searching students:', error);
        return throwError(() => new Error('Error searching students, please try again later.'));
      })
    );
  }

}
