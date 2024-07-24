import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StudentService } from './../../services/student.service';
import { Intern } from '../../interface/intern';
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
  interns$!: Observable<Intern>;
  displayModal: false;
  internId!: string;
  
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {
    this.displayModal = false;
  }

  ngOnInit(): void {
    this.interns$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.internId = String(params.get('id'));
        console.log('Fetching student with ID:', this.internId);
        return this.studentService.getIntern(this.internId);
      })
    );
  }

  deleteStudent(): void {
    this.studentService.deleteIntern(this.internId).subscribe(
      () => {
        alert('Student deleted successfully.');
        this.router.navigate(['/home']); // Navigate back to home after deletion
      },
      error => {
        console.error('Error deleting student:', error);
      }
    );
  }

  editStudent(): void {
    this.router.navigate(['/edit', this.internId]); // Navigate to edit student page with the student ID
  }

  closeModal(): void {
    this.displayModal = false;
  }
}
