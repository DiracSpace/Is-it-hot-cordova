import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Climate } from 'src/app/models/climate';

@Component({
  selector: 'app-display-climate-options',
  templateUrl: './display-climate-options.component.html',
  styleUrls: ['./display-climate-options.component.scss']
})
export class DisplayClimateOptionsComponent implements OnInit {

  @Input() climate: Climate;
  @Input() dataset: number;

  @Output() climateChange = new EventEmitter<Climate>();

  outlook_array = [
    "rainy",
    "overcast",
    "sunny"
  ]

  temps_array = [
    "hot",
    "mild",
    "cool"
  ]

  humidity_array = [
    "high",
    "normal",
    "low"
  ]

  windy_array = [
    "yes",
    "no"
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onClimateOptionChange() {
    this.climateChange.emit(this.climate);
  }

}
