import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  removeUserFromArray(id: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        this.users.splice(i, 1);
        break;
      }
    }
  }

  editUser(userId: String) {
    localStorage.setItem('editUserId', JSON.stringify(userId));
    this.router.navigate([`/edit-user`]);
  }

  removeUser(userId: String) {
    let id = {
      id: userId
    };
    this.userService.removeUser(id);
    this.removeUserFromArray(userId);
  }

}
