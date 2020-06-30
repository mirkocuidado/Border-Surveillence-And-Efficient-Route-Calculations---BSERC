import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  uri: String = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get('http://api.ipapi.com/api/check?access_key=ce849e5e7b988569565a367d7524cdd6')
  }

  getAllBorders() {
    return this.http.get(`${this.uri}/get-borders`);
  }

  updateBorder(border: any) {
    this.http.post(`${this.uri}/update-border`, border).subscribe(() => {});
  }

}
