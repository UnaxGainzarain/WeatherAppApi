import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonNote, IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunny, partlySunny, cloudy, rainy, thunderstorm, snow, cloudyNight, moon } from 'ionicons/icons';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonNote, IonIcon, IonText]
})
export class ForecastListComponent implements OnInit {
  @Input() items: any[] = [];

  constructor() {
    addIcons({ sunny, 'partly-sunny': partlySunny, cloudy, rainy, thunderstorm, snow, 'cloudy-night': cloudyNight, moon });
  }

  ngOnInit() { }

  getWeatherIcon(code: string): string {
    if (code === '01d') return 'sunny';
    if (code === '02d') return 'partly-sunny';
    if (code === '03d' || code === '04d') return 'cloudy';
    if (code === '09d' || code === '10d') return 'rainy';
    if (code === '11d') return 'thunderstorm';
    if (code === '13d') return 'snow';
    if (code === '50d') return 'cloudy-night';
    if (code === '01n') return 'moon';
    if (code === '02n') return 'cloudy-night';
    if (code === '03n' || code === '04n') return 'cloudy';
    if (code === '09n' || code === '10n') return 'rainy';
    if (code === '11n') return 'thunderstorm';
    if (code === '13n') return 'snow';
    if (code === '50n') return 'cloudy-night';
    return 'sunny';
  }


}
