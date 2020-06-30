import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getRequests();
  }

  requests: Request[] = [];

  getRequests() {
    this.userService.getAllRequests().subscribe((requests: Request[]) => {
      this.requests = requests;
    });
  }

  removeRequest(id: String) {
    for (let i = 0; i < this.requests.length; i++) {
      if (this.requests[i]._id === id) {
        this.requests.splice(i, 1);
        break;
      }
    }
  }

  addUser(requestId: String) {
    this.userService.getRequestById(requestId).subscribe((req: Request) => {
      let id = {
        id: requestId
      };
      this.userService.removeRegistrationRequest(id).subscribe(() => {});
      let user = {
        firstName: req.firstName,
        lastName: req.lastName,
        username: req.username,
        password: req.password,
        type: req.type,
        id: req.id,
        email: req.email,
        birthDate: req.birthDate,
        birthPlace: req.birthPlace
      }
      this.userService.addUser(user).subscribe(() => {});
      this.removeRequest(requestId);
    });
  }

  deleteRequest(requestId: String) {
    let id = {
      id: requestId
    };
    this.userService.removeRegistrationRequest(id).subscribe(() => {});
    this.removeRequest(requestId);
  }

}
