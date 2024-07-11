import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  editStudentForm!: FormGroup;
  studentId!: number;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadStudentDetails();
  }

  initForm(): void {
    this.editStudentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      studentId: ['', Validators.required]
    });
  }

  loadStudentDetails(): void {
    this.studentService.getStudent(this.studentId).subscribe(student => {
      this.editStudentForm.patchValue(student);
    }, error => {
      console.error('Error loading student details:', error);
    });
  }

  editStudent(): void {
    if (this.editStudentForm.valid) {
      const updatedStudent = this.editStudentForm.value;
      this.studentService.updateStudent(this.studentId, updatedStudent).subscribe(() => {
        console.log(updatedStudent)
        alert('Student updated successfully');
        this.router.navigate(['/details', this.studentId]);
      }, error => {
        console.error('Error updating student:', error);
      });
    } else {
      console.log('Form is invalid, please fix the errors.');
    }
  }
}
