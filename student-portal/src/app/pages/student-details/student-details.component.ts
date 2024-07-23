import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StudentService } from './../../services/student.service';
import { Student } from './../../interface/student';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EditStudentComponent } from "../../components/edit-student/edit-student.component";
import { AddStudentModalComponent } from "../../components/add-student-modal/add-student-modal.component";

@Component({
  selector: 'app-student-details',
  standalone: true,
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  imports: [CommonModule, RouterLink, EditStudentComponent, AddStudentModalComponent]
})
export class StudentDetailsComponent implements OnInit {
  [x: string]: any;
  student$!: Observable<Student>;
  displayModal: false;
  
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {
    this.displayModal = false;
  }

  ngOnInit(): void {
    this.student$ = this.route.paramMap.pipe(
      switchMap(params => {
        const studentId = Number(params.get('id'));
        console.log('Fetching student with ID:', studentId);
        return this.studentService.getStudent(studentId);
      })
    );
  }

  deleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        alert('Student deleted successfully.');
        this.router.navigate(['/home']); // Navigate back to home after deletion
      },
      error => {
        console.error('Error deleting student:', error);
      }
    );
  }

  editStudent(studentId: number): void {
    this.router.navigate(['/edit', studentId]); // Navigate to edit student page with the student ID
  }

  closeModal(): void {
    this.displayModal = false;
  }
}
