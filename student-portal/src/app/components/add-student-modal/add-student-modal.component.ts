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
  createInternForm!: FormGroup;
  @Output() closeModal = new EventEmitter<void>();
  @Output() InternAdded = new EventEmitter<void>();

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createInternForm = this.fb.group({
      username: ['', [Validators.required]],
      department: ['', Validators.required],
      programe: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // work_id: ['', Validators.required],
      school: ['', Validators.required],
      role: ['intern']
    });
  }

  addIntern(): void {
    if (this.createInternForm.valid) {
      const intern = this.createInternForm.value;
      this.studentService.createIntern(intern).subscribe(
        () => {
          console.log('Inter added successfully:', intern);
          this.createInternForm.reset();
          this.InternAdded.emit();
          this.closeModal.emit();
          // resfresh the page
          window.location.reload();
        },
        error => console.error('Error adding intern:', error)
      );
    } else {
      console.log('Form is invalid, please fix the errors.');
    }
    alert("Intern added successfully");
  }

  close(): void {
    this.closeModal.emit();
  }

  // generate work_id
  
}
