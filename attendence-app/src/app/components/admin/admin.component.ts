import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    )
  }

}
