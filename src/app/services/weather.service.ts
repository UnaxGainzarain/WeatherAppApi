import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    // Tu API Key de OpenWeather
    //49dea430a7c6d626a972baec4e125a69
    apiKey = 'c9423c5ae75b774c0b20ba6a32c978ad';
    baseUrl = 'https://api.openweathermap.org/data/2.5/';

    constructor(private http: HttpClient) { }

    // Método para buscar por ciudad (Requisito del enunciado)
    getWeatherByCity(city: string): Observable<any> {
        return this.http.get(`${this.baseUrl}weather?q=${city}&appid=${this.apiKey}&units=metric&lang=es`);
    }

    // Método para la predicción de 5 días (Requisito del enunciado)
    getForecastByCity(city: string): Observable<any> {
        return this.http.get(`${this.baseUrl}forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=es`);
    }
}
