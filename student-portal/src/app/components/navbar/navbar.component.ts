import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Admin } from '../../interface/admin';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected property name
})
export class NavbarComponent implements OnInit {
  links = [
    { path: 'admin-profile', label: 'Profile' },
    { path: 'settings', label: 'Settings' },
    { path: '/login', label: 'logout' }
  ];

  data?: Admin; // Correctly typed variable
  showDropdown = false;
  adminId!: string;

  constructor(private studentService: StudentService, private adminDataService: AdminDataService) { }

  ngOnInit(): void {
    const adminId = 1; // Assign a value to adminId
    // this.admin(adminId);
  }

  showDropdownMenu(): void {
    this.showDropdown = !this.showDropdown;
  
    // If the dropdown is open, close it after 5 seconds
    if (this.showDropdown) {
      setTimeout(() => {
        this.showDropdown = false;
      }, 5000);
    }
  }

  admin(adminId: number): void {
    this.studentService.getAdmin(this.adminId).subscribe(
      (response: Admin) => {
        this.data = response; // Correct variable assignment
        this.adminDataService.setAdmin(response); // Pass data to service
        console.log(this.data);
      },
      error => {
        console.error('Error getting admin:', error);
      }
    );
  }
}
