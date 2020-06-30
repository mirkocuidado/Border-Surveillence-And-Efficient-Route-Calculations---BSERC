import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: String = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUserById(id: String) {
    return this.http.get(`${this.uri}/get-user-by-id/${id}`);
  }

  getRequestById(id: String) {
    return this.http.get(`${this.uri}/get-request-by-id/${id}`);
  }

  addUser(user: any) {
    return this.http.post(`${this.uri}/add-user`, user);
  }

  editUser(userId: String, userData: any) {
    this.http.post(`${this.uri}/edit-user/${userId}`, userData).subscribe(() => {});
  }

  removeUser(id: any) {
    this.http.post(`${this.uri}/delete-user`, id).subscribe(() => {});
  }

  getAllRequests() {
    return this.http.get(`${this.uri}/requests`);
  }

  addRegistrationRequest(request: any) {
    this.http.post(`${this.uri}/add-registration-request`, request).subscribe(() => {});
  }

  removeRegistrationRequest(id: any) {
    return this.http.post(`${this.uri}/delete-registration-request`, id);
  }

}
