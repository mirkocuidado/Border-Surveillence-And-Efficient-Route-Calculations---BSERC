import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/UserService/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [ Validators.required, Validators.pattern(/^((?=[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,})$/)]),
    confirm_password: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  register() {
    let exists = 0;

    for(let i=0; i<this.users.length; i++){
      if(this.users[i].username == this.signUpForm.value.username){
        exists = 1;
        alert("Username already in use!");
        break;
      }
      if(this.users[i].email == this.signUpForm.value.email){
        exists = 1;
        alert("E-mail already in use!");
        break;
      }
    }

    if(exists === 0) {

      let passwordRegex = /^((?=[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,})$/;
      let idRegex = /^[0-9]{13}$/;
      let emailRegex = /^[\w\d\\.]+@\w+\.\w+$/;

      if(this.signUpForm.value.password !== this.signUpForm.value.confirm_password){
        alert("Password does not match the confirmed one!");
      }
      else{
        if(!passwordRegex.test(this.signUpForm.value.password)){
          alert("Password must have at least one small letter, one capital letter, one special character and must be at least 8 characters long!");
        }
        else{
          if(!emailRegex.test(this.signUpForm.value.email)) {
            alert("Invalid e-mail address!");
          }
          else if (!idRegex.test(this.signUpForm.value.id)) {
            alert('ID must consist of only numbers and its length must be 13!');
          }
          else {
            let request = {
              username: this.signUpForm.value.username,
              password: this.signUpForm.value.password,
              type: 'user',
              firstName: this.signUpForm.value.first_name,
              lastName: this.signUpForm.value.last_name,
              email: this.signUpForm.value.email,
              id: this.signUpForm.value.id,
              birthDate: this.signUpForm.value.date,
              birthPlace: this.signUpForm.value.place
            };
            this.userService.addRegistrationRequest(request);
            alert('Request submitted successfully!');
            this.router.navigate(['/']);
          }
        }
      }
  }
}

}
