import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonText, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonText, IonIcon, IonGrid, IonRow, IonCol]
})
export class WeatherCardComponent implements OnInit {
  // Mock data for design
  city: string = 'Arbizu';
  temperature: number = 8;
  description: string = 'Lluvia';
  minMax: string = '10°/4°';


  constructor() { }

  ngOnInit() { }

}
