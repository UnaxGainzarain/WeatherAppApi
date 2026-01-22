import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Fallback / mixed usage
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonText, IonThumbnail, IonIcon } from '@ionic/angular/standalone';
import { WeatherService } from '../services/weather.service';
import { addIcons } from 'ionicons';
import { sunny, partlySunny, cloudy, rainy, thunderstorm, snow, cloudyNight, moon } from 'ionicons/icons';

@Component({
    selector: 'app-hourly',
    templateUrl: './hourly.page.html',
    styleUrls: ['./hourly.page.scss'],
    standalone: true,
    imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonText, IonThumbnail, IonIcon]
})
export class HourlyPage implements OnInit {
    hourlyList: any[] = [];
    currentCity: string = '';

    constructor(private weatherService: WeatherService) {
        addIcons({ sunny, 'partly-sunny': partlySunny, cloudy, rainy, thunderstorm, snow, 'cloudy-night': cloudyNight, moon });
    }

    ngOnInit() {
        this.weatherService.currentCity$.subscribe(city => {
            this.currentCity = city;
            this.getHourlyForecast(city);
        });
    }

    getHourlyForecast(city: string) {
        this.weatherService.getForecastByCity(city).subscribe({
            next: (data) => {
                // Only take the first 8-12 items (approx 24-36 hours) for "hourly" view
                this.hourlyList = data.list.slice(0, 12);
            },
            error: (err) => console.error(err)
        });
    }

    getWeatherIcon(code: string): string {
        // Reuse icon logic (should ideally be in a shared service or util)
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
