import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const STUDENT_API_URL = 'http://localhost:8080/api/v1/students';
@Injectable({
  providedIn: 'root'
})

export class StudentService {
  
  constructor(
    private http: HttpClient
  ) { }

  // get all student

 
  


}
