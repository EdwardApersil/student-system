import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css']
})
export class AddStudentModalComponent implements OnInit {
  createStudentForm!: FormGroup;
  @Output() closeModal = new EventEmitter<void>();
  @Output() studentAdded = new EventEmitter<void>();

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createStudentForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      studentId: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  addStudent(): void {
    if (this.createStudentForm.valid) {
      const student = this.createStudentForm.value;
      this.studentService.createStudent(student).subscribe(
        () => {
          console.log('Student added successfully:', student);
          this.createStudentForm.reset();
          this.studentAdded.emit();
          this.closeModal.emit();
          // resfresh the page
          window.location.reload();
        },
        error => console.error('Error adding student:', error)
      );
    } else {
      console.log('Form is invalid, please fix the errors.');
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
