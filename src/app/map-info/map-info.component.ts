import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-info',
  templateUrl: './map-info.component.html',
  styleUrl: './map-info.component.css'
})
export class MapInfoComponent{
  @Input() countryName!: string;
  @Input() countryCapital!: string;
  @Input() countryRegion!: string;
  @Input() countryIncome!: string;
  @Input() countryLong!: string;
  @Input() countryLat!: string;
}
