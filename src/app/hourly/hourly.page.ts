import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Fallback / mixed usage
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonText, IonThumbnail, IonIcon, IonListHeader, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { WeatherService } from '../services/weather.service';
import { LanguageService } from '../services/language.service';
import { addIcons } from 'ionicons';
import { sunny, partlySunny, cloudy, rainy, thunderstorm, snow, cloudyNight, moon, water, umbrella } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';

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
    imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonText, IonThumbnail, IonIcon, IonListHeader, IonGrid, IonRow, IonCol, TranslateModule]
})
export class HourlyPage implements OnInit {
    forecastGroups: ForecastGroup[] = [];
    currentCity: string = '';
    currentLang: string = 'es';

    constructor(
        private weatherService: WeatherService,
        private languageService: LanguageService
    ) {
        addIcons({ sunny, 'partly-sunny': partlySunny, cloudy, rainy, thunderstorm, snow, 'cloudy-night': cloudyNight, moon, water, umbrella });
        this.currentLang = this.languageService.getCurrentLanguage();
    }

    ngOnInit() {
        this.weatherService.currentCity$.subscribe(city => {
            console.log('HourlyPage: Current city updated:', city);
            this.currentCity = city;
            if (city) {
                this.getHourlyForecast(city);
            }
        });

        this.languageService.currentLang$.subscribe((lang) => {
            this.currentLang = lang;
            if (this.currentCity) {
                this.getHourlyForecast(this.currentCity);
            }
        });
    }

    getHourlyForecast(city: string) {
        console.log('HourlyPage: Fetching forecast for', city);
        this.weatherService.getForecastByCity(city).subscribe({
            next: (data) => {
                console.log('HourlyPage: API Response:', data);
                this.processForecastGroups(data.list);
            },
            error: (err) => console.error('HourlyPage Error:', err)
        });
    }

    processForecastGroups(list: any[]) {
        console.log('HourlyPage: Processing list of size', list.length);
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
        console.log('HourlyPage: Groups created:', this.forecastGroups);

        // Interpolate the first group (Today) to get hourly data
        if (this.forecastGroups.length > 0) {
            this.forecastGroups[0].items = this.interpolateHourlyData(this.forecastGroups[0].items);
            console.log('HourlyPage: Interpolated first group:', this.forecastGroups[0].items);
        }
    }

    interpolateHourlyData(items: any[]): any[] {
        const hourlyItems: any[] = [];

        for (let i = 0; i < items.length - 1; i++) {
            const current = items[i];
            const next = items[i + 1];

            const currentDate = new Date(current.dt_txt);
            const nextDate = new Date(next.dt_txt);

            // Add current item
            hourlyItems.push(current);

            // Calculate hours difference (should be 3 usually)
            const diffHours = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);

            if (diffHours > 1) {
                // Interpolate
                for (let h = 1; h < diffHours; h++) {
                    const interpolatedTime = new Date(currentDate.getTime() + h * 60 * 60 * 1000);
                    const factor = h / diffHours;

                    const newItem = JSON.parse(JSON.stringify(current)); // Deep copy

                    // Update Time
                    newItem.dt_txt = interpolatedTime.toISOString().replace('T', ' ').substring(0, 19);

                    // Linear Interpolation
                    newItem.main.temp = current.main.temp + (next.main.temp - current.main.temp) * factor;
                    newItem.main.feels_like = current.main.feels_like + (next.main.feels_like - current.main.feels_like) * factor;
                    newItem.main.humidity = Math.round(current.main.humidity + (next.main.humidity - current.main.humidity) * factor);
                    newItem.wind.speed = current.wind.speed + (next.wind.speed - current.wind.speed) * factor;
                    if (current.pop !== undefined && next.pop !== undefined) {
                        newItem.pop = current.pop + (next.pop - current.pop) * factor;
                    }


                    hourlyItems.push(newItem);
                }
            }
        }

        // Add last item
        if (items.length > 0) {
            hourlyItems.push(items[items.length - 1]);
        }

        return hourlyItems;
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
