import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, map, filter } from 'rxjs/operators';
import { Intern } from '../../interface/intern';
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
  interns$!: Observable<Intern[]>;
  searchControl = new FormControl('');
  filteredStudents$!: Observable<Intern[]>;
  createStudentForm!: FormGroup;
  displayForm = false;
  displayModal = false;

  workid!: string;

  numberOfStudents = 0;

  constructor(private studentService: StudentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStudents();
    this.setupSearch();
    this.closeModal();
    this.generateWorkId();
  
    // this.createStudent();
    // this.addStudent();
  }

  getStudents(): void {
    this.interns$ = this.studentService.getInterns();
    this.interns$.subscribe(interns => {
      this.numberOfStudents = interns.length;
    });
  }

  setupSearch(): void {
    this.filteredStudents$ = combineLatest([
      this.interns$,
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

  filterStudents(students: Intern[], text: string): Intern[] {
    const lowerCaseText = text.toLocaleLowerCase();
    return students.filter(student => student.username.toLocaleLowerCase().includes(lowerCaseText));
  }

  openModal(): void {
    this.displayModal = true;
    // alert("Hello")
  }

  closeModal(): void {
    this.displayModal = false;
  }

  generateWorkId(){
    this.workid = "EIntern" + Math.random().toString(36).substr(2, 9);
  }


  onStudentAdded(): void {
    this.getStudents(); // Refresh the student list
    this.closeModal();
  }
}