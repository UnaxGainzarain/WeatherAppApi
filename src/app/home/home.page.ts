import { Component } from '@angular/core';
import { WeatherCardComponent } from '../components/weather-card/weather-card.component';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, WeatherCardComponent],
})
export class HomePage {
  constructor() { }
}
