import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataService } from '../../services/admin-data.service';
import { Admin } from '../../interface/admin';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin?: Admin;

  constructor(private adminDataService: AdminDataService) { }

  ngOnInit(): void {
    this.adminDataService.currentAdmin$.subscribe(
      (admin: Admin | null) => {
        if (admin) {
          this.admin = admin;
        }
      },
      error => {
        console.error('Error getting admin:', error);
      }
    );
  }
}
