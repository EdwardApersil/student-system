import { Intern } from './../../interface/intern';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  // studentId!: number;
  updatedIntern!: string;
  @Output() closeModal = new EventEmitter<void>();


  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    // this.loadStudentDetails();
  }

  initForm(): void {
    this.editStudentForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      // address: ['', Validators.required],
      // course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      work_id: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  loadStudentDetails(): void {
    this.studentService.getIntern(this.updatedIntern).subscribe(student => {
      this.editStudentForm.patchValue(student);
    }, error => {
      console.error('Error loading student details:', error);
    });
  }

  editIntern(): void {
    if (this.editStudentForm.valid) {
      const updatedIntern = this.editStudentForm.value;
      this.studentService.updateIntern(this.updatedIntern, updatedIntern).subscribe(() => {
        console.log(updatedIntern);
        alert('Student updated successfully');
        this.router.navigate(['/details', this.updatedIntern]);
        this.closeModal.emit();
      }, error => {
        console.error('Error updating Intern details:', error);
      });
    } else {
      console.log('Form is invalid, please fix the errors.');
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
