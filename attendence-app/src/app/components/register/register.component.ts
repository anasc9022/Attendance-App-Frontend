import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string = '';
  password: string = '';
  email: string = '';
  phone: string = '';

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    let user = new User();

    user.userName = this.userName;
    user.password = this.password;
    user.email = this.email;
    user.phone = this.phone;

    this.userService.register(user).subscribe({
      next: response => {
        alert(`Your have successfully registered`)
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }


}
