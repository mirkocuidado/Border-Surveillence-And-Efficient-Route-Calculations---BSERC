import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  username: String;
  password: String;
  users: User[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  login(){
    let foundUser: User = null;
    this.users.forEach((user: User) => {
      if (user.username === this.username && user.password === this.password) {
        foundUser = user;
      }
    });
    if (foundUser != null) {
      if (foundUser.type === 'administrator') {
        this.router.navigate(['/administrator']);
      }
      else if (foundUser.type === 'user') {
        this.router.navigate(['/user']);
      }
    }
    else {
      alert('No such user found!');
    }
  }
}
