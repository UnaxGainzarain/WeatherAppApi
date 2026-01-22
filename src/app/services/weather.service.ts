import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    // Tu API Key de OpenWeather
    //49dea430a7c6d626a972baec4e125a69
    apiKey = '49dea430a7c6d626a972baec4e125a69';
    baseUrl = 'https://api.openweathermap.org/data/2.5/';

    private currentCitySubject = new BehaviorSubject<string>('Madrid');
    currentCity$ = this.currentCitySubject.asObservable();

    constructor(private http: HttpClient) { }

    updateCity(city: string) {
        this.currentCitySubject.next(city);
    }

    // Método para buscar por ciudad (Requisito del enunciado)
    getWeatherByCity(city: string): Observable<any> {
        return this.http.get(`${this.baseUrl}weather?q=${city}&appid=${this.apiKey}&units=metric&lang=es`);
    }

    // Método para la predicción de 5 días (Requisito del enunciado)
    getForecastByCity(city: string): Observable<any> {
        return this.http.get(`${this.baseUrl}forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=es`);
    }

    getUV(lat: number, lon: number): Observable<any> {
        // Try to use One Call API 2.5 if available, or fall back to UV endpoint if needed.
        // For simplicity in this project context, we'll try the One Call 2.5 which is common for legacy/student keys
        // If that fails, we might need a different strategy, but let's start here.
        // Actually, let's use the widely compatible generic 'onecall' or 'uvi' if specific.
        // Let's try the specific UV endpoint first as it's simpler:
        // https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
        // Note: this endpoint is technically deprecated but often works for simple keys. 
        // If it doesn't, we will swap to One Call.
        return this.http.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
    }
}
