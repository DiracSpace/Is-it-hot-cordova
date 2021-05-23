import { Component, OnInit } from '@angular/core';
import { Climate } from 'src/app/models/climate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NaiveBayes } from 'src/app/bayes/bayes';
import { YesNoBayesResult } from 'src/app/models/yesnobayesresult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'naive-bayes';

  private climate_data: Climate[] = [];
  public climate: Climate = {
    outlook : "sunny",
    temp    : "cool",
    humidity: "high",
    windy   : "yes",
  }

  public yes: string;
  public no: string;
  public dataset: number;
  public isLoaded: boolean;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.request();

    if (this.isLoaded) {
      this.naive_bayes;
    }
  }

  get yesValue() {
    return Number(this.yes);
  }

  get noValue() {
    return Number(this.no);
  }

  get yesType() {
    return (this.checkMaxNumber() == Number(parseFloat(this.yes).toFixed(2))) ? "success" : "danger";
  }

  get noType() {
    return (this.checkMaxNumber() == Number(parseFloat(this.no).toFixed(2))) ? "success" : "danger";
  }

  onClimateChange(climate: Climate) {
    this.climate = climate;
    this.naive_bayes();
  }

  private checkMaxNumber() {
    return Math.max(Number(this.no), Number(this.yes));
  }

  private async request() {
    this.isLoaded = false;
    this.getJson().subscribe({
      next: (data: Climate[]) => {
        this.climate_data = data;
        this.dataset = data.length;
      },
      error: message => {
        console.log("error: ", message);
      },
      complete: () => {
        this.isLoaded = true;
        this.naive_bayes();
      }
    });
  }

  private naive_bayes() {
    let classifier = new NaiveBayes();

    this.climate_data.forEach(climate => classifier.train(climate));

    let p: YesNoBayesResult = classifier.classify("is_it_hot", this.climate);

    this.no = parseFloat(p.no).toFixed(2);
    this.yes = parseFloat(p.yes).toFixed(2);
  }

  private getJson(): Observable<any> {
    return this.http.get('./assets/temps6.json');
  }
}
