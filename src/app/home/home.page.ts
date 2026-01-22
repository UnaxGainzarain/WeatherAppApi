import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from '../components/weather-card/weather-card.component';
import { WeatherService } from '../services/weather.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, WeatherCardComponent, FormsModule, IonSearchbar, IonButtons, IonButton, IonIcon],
})
export class HomePage {
  searchTerm: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {
    addIcons({ locate });
  }

  searchCity() {
    if (this.searchTerm.trim() === '') return;

    this.weatherService.getWeatherByCity(this.searchTerm).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log('Weather data:', data);
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
      }
    });
  }

  getCurrentLocation() {
    console.log('Getting current location...');
    // TODO: Implement Gelocation logic
  }
}
