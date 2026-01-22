import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherCardComponent } from '../components/weather-card/weather-card.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, WeatherCardComponent, FormsModule, IonSearchbar, IonButtons, IonButton, IonIcon],
})
export class HomePage {
  searchTerm: string = '';

  constructor() {
    addIcons({ locate });
  }

  searchCity() {
    console.log('Searching for:', this.searchTerm);
    // TODO: Connect to service
  }

  getCurrentLocation() {
    console.log('Getting current location...');
    // TODO: Implement Gelocation logic
  }
}
