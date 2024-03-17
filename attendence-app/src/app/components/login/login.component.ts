import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceReport } from 'src/app/common/attendance-report';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerId: number;
  userId: number;
  userName: string = '';
  password: string = '';
  loggedIn: boolean = false;
  loginDate: Date = null;
  signInTime: string = '';
  singOutTime: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.userName == "admin" && this.password == "admin") {
      this.router.navigate(['/admin']);
    }
    else {
      this.userService.logIn(this.userName, this.password).subscribe({
        next: response => {
          alert(`You have successfully logged in`);
          this.loggedIn = true;
          this.userId = response.id;
          this.loginDate = response.loginDate;
          this.signInTime = response.signInTime;
          this.singOutTime = response.signOutTime;
          this.registerId = response.userId;
        },
        error: err => {
          alert(`There was an error: ${err.error}`);
        }
      });
    }
  }

  logout() {
    this.loggedIn = false;
    this.userService.logOut(this.userId).subscribe({
      next: response => {
        alert(`You have successfully logged out`);
      },
      error: err => {
        alert(`There was an error: ${err.error}`);
      }
    });
  }

}
