import { Component, EventEmitter, Output} from '@angular/core';
import { MapApiService } from '../map-api.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  constructor(
    private mapApiService: MapApiService
  ){}

  text: string = '';

  @Output() countryName = new EventEmitter<string>();
  @Output() countryCapital= new EventEmitter<string>();
  @Output() countryRegion= new EventEmitter<string>();
  @Output() countryIncome= new EventEmitter<string>();
  @Output() countryLong= new EventEmitter<string>();
  @Output() countryLat= new EventEmitter<string>();

  ngAfterViewInit(){
    const countryPaths = document.querySelectorAll('path');
    
    countryPaths.forEach((path: SVGPathElement) => {
      path.addEventListener('click', this.loadCountryDataClick.bind(this));
    })
  }

  onSubmit() {
    if(!this.text){
      alert("Please enter a country!")
    }
    else{
      let name = this.text.toLowerCase();
      let words = name.split(" ");
      for (let i = 0; i < words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
      }
      name = words.join(" ");
      this.loadCountryDataSearch(name);
    }
  }

  loadCountryDataSearch(name: string){
    let dataArray = Array.from(document.querySelectorAll('path'));
    let i = 0;
    let data: SVGPathElement;
    
    for (;i < dataArray.length; i++){
      if (!dataArray[i]){}
      else{
        data = dataArray[i];
        this.mapApiService.getCountryInfo(data.id).subscribe((temp: any) =>{
        if (name == temp[1][0].name){    
          this.loadCountryData(temp[1][0].id);
        }})
      }
      }
  }
    
  

  loadCountryDataClick(event: MouseEvent){
    const countryPath = event.target as SVGPathElement;
    this.loadCountryData(countryPath.id);
  }

  loadCountryData(countryId: string){
    this.mapApiService.getCountryInfo(countryId).subscribe((data: any) =>{
      this.countryName.emit(data[1][0].name);
      this.countryCapital.emit(data[1][0].capitalCity);
      this.countryRegion.emit(data[1][0].region.value);
      this.countryIncome.emit(data[1][0].incomeLevel.value);
      this.countryLong.emit(data[1][0].longitude);
      this.countryLat.emit(data[1][0].latitude);
    })
  }
}
