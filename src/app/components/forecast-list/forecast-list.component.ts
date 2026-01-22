import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonNote, IonIcon, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonNote, IonIcon, IonText]
})
export class ForecastListComponent implements OnInit {
  @Input() items: any[] = [];

  constructor() { }

  ngOnInit() { }


}
