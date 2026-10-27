import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedName: string = '';
  selectedCapital: string = '';
  selectedRegion: string = '';
  selectedIncome: string = '';
  selectedLong: string = '';
  selectedLat: string = '';
}
