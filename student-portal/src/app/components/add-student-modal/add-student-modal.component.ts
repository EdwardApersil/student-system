import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-student-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css']
})
export class AddStudentModalComponent implements OnInit {
  createStudentForm!: FormGroup;
  displayModal = false;
  @Output() closeModal = new EventEmitter<void>();
  // Added displayModal for controlling modal visibility

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createStudentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      studentId: ['', Validators.required, Validators.minLength(19)]
    });
  }

  addStudent(): void {
    if (this.createStudentForm.valid) {
      const student = this.createStudentForm.value;
      console.log('Adding student:', student);
      this.studentService.createStudent(student).subscribe(() => {
        alert('Student added successfully:');
        this.createStudentForm.reset();
        this.closeModal.emit(); // Emit the closeModal event
      }, error => {
        console.error('Error adding student:', error);
      });
    } else {
      // Form is invalid, log the errors
      Object.keys(this.createStudentForm.controls).forEach(field => {
        const control = this.createStudentForm.get(field);
        if (control && control.invalid) {
          console.log(`${field}: ${control.errors ? Object.values(control.errors).join(', ') : 'No errors'}`);
        }
      });
    }
  }
}
