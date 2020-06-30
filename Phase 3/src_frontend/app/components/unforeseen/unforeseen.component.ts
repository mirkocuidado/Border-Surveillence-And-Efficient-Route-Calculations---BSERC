import { Component, OnInit } from '@angular/core';
import { Border } from 'src/app/models/border';
import { MapService } from 'src/app/services/MapService/map.service';

@Component({
  selector: 'app-unforeseen',
  templateUrl: './unforeseen.component.html',
  styleUrls: ['./unforeseen.component.css']
})
export class UnforeseenComponent implements OnInit {

  constructor(private map: MapService) { }

  borders: Border[] = [];
  bordersWithMessage: Border[] = [];
  message: String;
  timeToWait: number;
  borderNameToChange: String;
  borderWorkingNormallyString: String;

  ngOnInit(): void {
    this.map.getAllBorders().subscribe((borders: Border[]) => {
      this.borders = borders;
      this.updateBordersWithMessage();
    })
  }

  updateBordersWithMessage() {
    this.bordersWithMessage = [];
    this.borders.forEach((border: Border) => {
      if (border.message !== '') {
        this.bordersWithMessage.push(border);
      }
    })
  }

  sendUpdate() {
    let border: Border = null;
    this.borders.forEach((currBorder: Border) => {
      if (this.borderNameToChange === currBorder.name) {
        border = currBorder;
      }
    })
    border.message = this.message;
    border.timeToWait = this.timeToWait;
    let reqBorder = {
      name: border.name,
      lat: border.lat,
      lng: border.lng,
      country: border.country,
      link: border.link,
      message: this.message,
      timeToWait: this.timeToWait
    };
    this.map.updateBorder(reqBorder);
    this.updateBordersWithMessage();
    this.message = '';
    this.timeToWait = 0;
  }

  borderWorkingNormally() {
    let border: Border = null;
    this.borders.forEach((currBorder: Border) => {
      if (this.borderWorkingNormallyString === currBorder.name) {
        border = currBorder;
      }
    })
    border.message = "";
    border.timeToWait = 0;
    let reqBorder = {
      name: border.name,
      lat: border.lat,
      lng: border.lng,
      country: border.country,
      link: border.link,
      message: "",
      timeToWait: 0
    };
    this.map.updateBorder(reqBorder);
    this.updateBordersWithMessage();
  }

}
