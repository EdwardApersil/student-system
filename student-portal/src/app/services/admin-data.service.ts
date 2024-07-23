import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Admin } from '../interface/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  
  private adminSource = new BehaviorSubject<Admin | null>(null);
  currentAdmin$ = this.adminSource.asObservable();

  setAdmin(admin: Admin) {
    this.adminSource.next(admin);
  }
}
