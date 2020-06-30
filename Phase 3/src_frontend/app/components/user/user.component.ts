/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/MapService/map.service';
import { Border } from 'src/app/models/border';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  lat: string;
  lng: string;
  origin: any;
  destination: any;
  destination2: any;
  matrix: any;

  borders: Border[] = [];
  flag: boolean;
  showMapBoolean: boolean;
  country: String;
  finalDest: String;
  countries: String[] = ["Hungary", "Romania", "Bulgaria", "Macedonia", "Albania", "Montenegro", "Bosnia and Herzegovina", "Croatia"]

  bla: String;
  timeNeeded: Map<Border, number> = new Map<Border, number>();
  currentCongestion: Map<Border, number> = new Map<Border, number>();
  minTime: number = 999999;
  chosenBorder: Border = null;


  constructor(private map: MapService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.matrix = new google.maps.DistanceMatrixService();
    this.map.getLocation().subscribe((data: any) => {
      console.log(data);
      this.lat = data.latitude;
      this.lng = data.longitude;
      this.origin = { lat: this.lat, lng: this.lng };
      this.map.getAllBorders().subscribe((borders: Border[]) => {
        this.borders = borders;
        this.borders.forEach((border: Border) => {
          let waitTime: number = Math.round((Math.random() * 180 + 20) * 120);
          this.currentCongestion.set(border, waitTime);
          /* ***** */
          this.matrix.getDistanceMatrix({
            origins: [this.origin],
            destinations: [`${border.lat},${border.lng}`],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC
          }, (response, status) => {
            if (status !== 'OK') {
              console.log(status);
            }
            else {
              let time: number = response.rows[0].elements[0].duration.value;
              this.timeNeeded.set(border, time);
            }
          });
        });
      });
    });
  }

  showMap() {
    this.destination = `${this.chosenBorder.lat},${this.chosenBorder.lng}`;
    this.destination2 = `${this.finalDest},${this.country}`;
    this.flag = true;
  }

  search1() {
    this.minTime = 999999;
    this.chosenBorder = null;
    this.timeNeeded.forEach((time: number, border: Border) => {
      if (border.country === this.country) {
        let timeToDest: number;
        this.matrix.getDistanceMatrix({
          origins: [`${border.lat},${border.lng}`],
          destinations: [`${this.finalDest},${this.country}`],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC
        }, (response, status) => {
          if (status !== 'OK') {
            console.log(status);
          }
          else {
            timeToDest = response.rows[0].elements[0].duration.value;
            let totalTime: number = time + timeToDest + this.currentCongestion.get(border) + border.timeToWait * 60;
            if (this.minTime > totalTime) {
              this.minTime = totalTime;
              this.chosenBorder = border;
            }
          }
        });
      }
    });
    this.showMapBoolean = true;
  }

  search2() {
    this.minTime = 999999;
    this.chosenBorder = null;
    this.timeNeeded.forEach((time: number, border: Border) => {
      if (border.country === this.country) {
        let totalTime: number = time + this.currentCongestion.get(border) + border.timeToWait * 60;
        if (this.minTime > totalTime) {
          this.minTime = totalTime;
          this.chosenBorder = border;
        }
      }
    });
    this.destination = `${this.chosenBorder.lat},${this.chosenBorder.lng}`;
    this.flag = true;
  }

}
