import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, map, filter } from 'rxjs/operators';
import { Student } from '../../interface/student';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddStudentModalComponent } from "../../components/add-student-modal/add-student-modal.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AddStudentModalComponent
    ]
})
export class HomeComponent implements OnInit {
  students$!: Observable<Student[]>;
  searchControl = new FormControl('');
  filteredStudents$!: Observable<Student[]>;
  createStudentForm!: FormGroup;
  displayForm = false;
  displayModal = false;

  numberOfStudents = 0;

  constructor(private studentService: StudentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStudents();
    this.setupSearch();
    this.closeModal();
  
    // this.createStudent();
    // this.addStudent();
  }

  getStudents(): void {
    this.students$ = this.studentService.getStudents();
    this.students$.subscribe(students => {
      this.numberOfStudents = students.length;
    });
  }

  setupSearch(): void {
    this.filteredStudents$ = combineLatest([
      this.students$,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        filter(searchTerm => searchTerm !== null),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([students, searchTerm]) => {
        if (searchTerm !== null) {
          return this.filterStudents(students, searchTerm);
        } else {
          return students;
        }
      })
    );
  }

  filterStudents(students: Student[], text: string): Student[] {
    const lowerCaseText = text.toLocaleLowerCase();
    return students.filter(student => student.name.toLocaleLowerCase().includes(lowerCaseText));
  }

  openModal(): void {
    this.displayModal = true;
    // alert("Hello")
  }

  closeModal(): void {
    this.displayModal = false;
  }


  onStudentAdded(): void {
    this.getStudents(); // Refresh the student list
    this.closeModal();
  }
}