import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../services/data.service';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { TasksReport } from '../../interface/tasksReport';
import { TasksService } from '../../services/tasks.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-intern-dashboard',
  standalone: true,
  templateUrl: './intern-dashboard.component.html',
  styleUrls: ['./intern-dashboard.component.css'],
  imports: [ReactiveFormsModule, CommonModule]

})
export class InternDashboardComponent implements OnInit {
  tasksWithDetails$!: Observable<TasksReport[]>;
  filteredTask$!: Observable<any[]>;
  searchControl = new FormControl('');
  dataService: any;

  constructor(private taskService: TasksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tasksWithDetails$ = this.taskService.getTasksWithDetails();
    this.searchTasks();
  }

  searchTasks(): void {
    this.filteredTask$ = combineLatest([
      this.tasksWithDetails$,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([tasks, searchTerm]) => this.filteredTasks(tasks, searchTerm ?? ''))
    );
  }

  filteredTasks(tasks: any[], text: string): any[] {
    const lowCaseText = text.toLocaleLowerCase();
    return tasks.filter(task => task.title?.toLocaleLowerCase().includes(lowCaseText));
  }

  deleteTaskReport(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasksWithDetails$ = this.dataService.getTasksWithDetails();
    });
  }
}