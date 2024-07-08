import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StudentService } from './../../services/student.service';
import { Student } from './../../interface/student';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: true,
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  imports: [CommonModule, RouterLink]
})
export class StudentDetailsComponent implements OnInit {
  student$!: Observable<Student>;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.student$ = this.route.paramMap.pipe(
      switchMap(params => {
        const studentId = Number(params.get('id'));
        console.log('Fetching student with ID:', studentId);
        return this.studentService.getStudent(studentId);
      })
    );
  }
}

