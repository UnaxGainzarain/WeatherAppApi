import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from '../components/weather-card/weather-card.component';
import { ForecastListComponent } from '../components/forecast-list/forecast-list.component';
import { WeatherService } from '../services/weather.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locate, sunny, partlySunny, cloudy, rainy, thunderstorm, snow, cloudyNight, moon } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, WeatherCardComponent, ForecastListComponent, FormsModule, IonSearchbar, IonButtons, IonButton, IonIcon],
})
export class HomePage {
  searchTerm: string = '';
  weatherData: any;
  forecastList: any[] = [];
  uvIndex: number = 0;
  currentIcon: string = 'sunny';

  constructor(private weatherService: WeatherService) {
    addIcons({ locate, sunny, 'partly-sunny': partlySunny, cloudy, rainy, thunderstorm, snow, 'cloudy-night': cloudyNight, moon });
  }

  searchCity() {
    if (this.searchTerm.trim() === '') return;

    this.weatherService.getWeatherByCity(this.searchTerm).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.currentIcon = this.getWeatherIcon(data.weather[0].icon);
        console.log('Weather data:', data);

        // Fetch UV Index using coordinates
        if (data.coord) {
          this.weatherService.getUV(data.coord.lat, data.coord.lon).subscribe({
            next: (uvData) => {
              // One Call API returns 'current.uvi', generic UV endpoint returns 'value'
              this.uvIndex = uvData.value || uvData.current?.uvi || 0;
              console.log('UV Index:', this.uvIndex);
            },
            error: (err) => console.error('Error fetching UV:', err)
          });
        }
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
      }
    });

    this.weatherService.getForecastByCity(this.searchTerm).subscribe({
      next: (data) => {
        this.processForecast(data.list); // Process data to get daily summaries
        console.log('Forecast data:', data);
      },
      error: (err) => {
        console.error('Error fetching forecast:', err);
      }
    });
  }

  processForecast(list: any[]) {
    const dailyMap = new Map<string, any>();

    for (const item of list) {
      const date = item.dt_txt.split(' ')[0]; // Get YYYY-MM-DD

      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          dt_txt: item.dt_txt,
          weather: item.weather,
          min: item.main.temp_min,
          max: item.main.temp_max
        });
      } else {
        const day = dailyMap.get(date);
        day.min = Math.min(day.min, item.main.temp_min);
        day.max = Math.max(day.max, item.main.temp_max);

        // Improve styling: try to take weather icon from noon (12:00) if possible to avoid night icons
        if (item.dt_txt.includes('12:00:00')) {
          day.weather = item.weather;
        }
      }
    }

    // Convert map values to array and skip today if included (optional, based on preference)
    // We limit to 5 days
    this.forecastList = Array.from(dailyMap.values()).slice(0, 5);
  }

  getCurrentLocation() {
    console.log('Getting current location...');
    // TODO: Implement Gelocation logic
  }

  getWeatherIcon(code: string): string {
    // Map OpenWeather icons to Ionicons
    // Day icons
    if (code === '01d') return 'sunny';
    if (code === '02d') return 'partly-sunny';
    if (code === '03d' || code === '04d') return 'cloudy';
    if (code === '09d' || code === '10d') return 'rainy';
    if (code === '11d') return 'thunderstorm';
    if (code === '13d') return 'snow';
    if (code === '50d') return 'cloudy-night'; // Mist/Fog

    // Night icons
    if (code === '01n') return 'moon';
    if (code === '02n') return 'cloudy-night';
    if (code === '03n' || code === '04n') return 'cloudy';
    if (code === '09n' || code === '10n') return 'rainy';
    if (code === '11n') return 'thunderstorm';
    if (code === '13n') return 'snow';
    if (code === '50n') return 'cloudy-night';

    return 'sunny'; // Default
  }
}
