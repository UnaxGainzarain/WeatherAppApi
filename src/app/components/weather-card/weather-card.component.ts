import { Component, OnInit, Input } from '@angular/core';
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
  @Input() weather: any;
  @Input() uvIndex: number = 0;
  @Input() icon: string = 'sunny';
  ngOnInit() { }

}
