import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-progress-bar',
  templateUrl: './display-progress-bar.component.html',
  styleUrls: ['./display-progress-bar.component.scss']
})
export class DisplayProgressBarComponent implements OnInit {

  @Input() percentage: number;
  @Input() type: string;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
