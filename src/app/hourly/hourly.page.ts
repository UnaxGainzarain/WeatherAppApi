import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Fallback / mixed usage
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonText, IonThumbnail, IonIcon } from '@ionic/angular/standalone';
import { WeatherService } from '../services/weather.service';
import { addIcons } from 'ionicons';
import { sunny, partlySunny, cloudy, rainy, thunderstorm, snow, cloudyNight, moon, water, umbrella } from 'ionicons/icons';

export interface ForecastGroup {
    date: string; // YYYY-MM-DD
    displayDate: string; // e.g. "Monday, 12 Jan"
    items: any[];
}

@Component({
    selector: 'app-hourly',
    templateUrl: './hourly.page.html',
    styleUrls: ['./hourly.page.scss'],
    standalone: true,
    imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonText, IonThumbnail, IonIcon]
})
export class HourlyPage implements OnInit {
    forecastGroups: ForecastGroup[] = [];
    currentCity: string = '';

    constructor(private weatherService: WeatherService) {
        addIcons({ sunny, 'partly-sunny': partlySunny, cloudy, rainy, thunderstorm, snow, 'cloudy-night': cloudyNight, moon, water, umbrella });
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
                this.processForecastGroups(data.list);
            },
            error: (err) => console.error(err)
        });
    }

    processForecastGroups(list: any[]) {
        const groups = new Map<string, ForecastGroup>();

        for (const item of list) {
            const date = item.dt_txt.split(' ')[0]; // YYYY-MM-DD

            if (!groups.has(date)) {
                groups.set(date, {
                    date: date,
                    displayDate: date, // We will format this in HTML or here if needed
                    items: []
                });
            }
            groups.get(date)?.items.push(item);
        }

        // Convert map to array and take top 5 entries (Today + 4 days)
        this.forecastGroups = Array.from(groups.values()).slice(0, 5);
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
