import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  userId: String;
  first_name: String;
  last_name: String;
  username1: String;
  username2: String;
  password: String;
  confirm_password: String;
  date: Date;
  place: String;
  id: String;
  email1: String;
  email2: String;
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('editUserId'));
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.first_name = user.firstName;
      this.last_name = user.lastName;
      this.username1 = user.username;
      this.username2 = user.username;
      this.password = user.password;
      this.confirm_password = user.password;
      this.date = user.birthDate;
      this.place = user.birthPlace;
      this.id = user.id;
      this.email1 = user.email;
      this.email2 = user.email;
    });
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  editUser() {
    let exists = 0;

    for(let i=0; i<this.users.length; i++){
      if(this.username1 !== this.username2 && this.users[i].username === this.username2){
        exists = 1;
        alert("Username already in use!");
        break;
      }
      if(this.email1 !== this.email2 && this.users[i].email === this.email2){
        exists = 1;
        alert("E-mail already in use!");
        break;
      }
    }

    if(exists === 0) {

      let passwordRegex = /^((?=[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,})$/;
      let idRegex = /^[0-9]{13}$/;
      let emailRegex = /^[\w\d\\.]+@\w+\.\w+$/;

      if(this.password !== this.confirm_password){
        alert("Password does not match the confirmed one!");
      }
      else{
        let passwordstring: string = String(this.password);
        if(!passwordRegex.test(passwordstring)){
          alert("Password must have at least one small letter, one capital letter, one special character and must be at least 8 characters long!");
        }
        else{
          let emailstring: string = String(this.email2);
          let idstring: string = String(this.id);
          if(!emailRegex.test(emailstring)) {
            alert("Invalid e-mail address!");
          }
          else if (!idRegex.test(idstring)) {
            alert('ID must consist of only numbers and its length must be 13!');
          }
          else {
            let request = {
              username: this.username2,
              password: this.password,
              type: 'user',
              firstName: this.first_name,
              lastName: this.last_name,
              email: this.email2,
              id: this.id,
              birthDate: this.date,
              birthPlace: this.place
            };
            this.userService.editUser(this.userId, request);
            alert('User editted successfully!');
            this.router.navigate(['/all-users']);
          }
        }
      }
  }
  }

}
