import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map } from 'rxjs';
import { TasksReport } from '../interface/tasksReport';
import { Intern } from '../interface/intern';
import { LineManager } from '../interface/linemanager';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  INTERN_API_URL = 'http://localhost:3000/interns';
  ADMIN_API_URL = 'http://localhost:3000/admins';
  LINE_MANAGER_API_URL = 'http://localhost:3000/lineManagers';
  TASK_API_URL = 'http://localhost:3000/tasksReports';

  constructor(private http: HttpClient) {}

  getTasksReports(): Observable<TasksReport[]> {
    return this.http.get<TasksReport[]>(this.TASK_API_URL);
  }

  getInterns(): Observable<Intern[]> {
    return this.http.get<Intern[]>(this.INTERN_API_URL);
  }

  getLineManagers(): Observable<LineManager[]> {
    return this.http.get<LineManager[]>(this.LINE_MANAGER_API_URL);
  }

  getTasksWithDetails(): Observable<any[]> {
    return combineLatest([this.getTasksReports(), this.getInterns(), this.getLineManagers()]).pipe(
      map(([tasks, interns, lineManagers]) => {
        return tasks.map(task => {
          const intern = interns.find(i => i.work_id === task.work_id);
          const taggedLineManagers = task.tagged_line_manager_ids.map(id => lineManagers.find(lm => lm.id === id));

          return {
            ...task,
            intern,
            taggedLineManagers
          };
        });
      })
    );
  }

  // Create new task
  createTask(task: TasksReport): Observable<TasksReport> {
    return this.http.post<TasksReport>(this.TASK_API_URL, task);
  }

  // Delete task
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.TASK_API_URL}/${id}`);
  }
}
