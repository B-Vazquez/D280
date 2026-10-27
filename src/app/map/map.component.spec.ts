import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MapApiService } from '../map-api.service';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let mapApiService: jasmine.SpyObj<MapApiService>;

  beforeEach(async () => {
    mapApiService = jasmine.createSpyObj<MapApiService>('MapApiService', ['getCountryInfo']);

    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [FormsModule],
      providers: [{ provide: MapApiService, useValue: mapApiService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads country data and emits its details', () => {
    mapApiService.getCountryInfo.and.returnValue(of([
      { page: 1 },
      [{
        id: 'RU',
        name: 'Russian Federation',
        capitalCity: 'Moscow',
        region: { value: 'Europe & Central Asia' },
        incomeLevel: { value: 'Upper middle income' },
        longitude: '37.6173',
        latitude: '55.7558'
      }]
    ]));

    const countryName = jasmine.createSpy('countryName');
    const countryCapital = jasmine.createSpy('countryCapital');
    const countryRegion = jasmine.createSpy('countryRegion');
    const countryIncome = jasmine.createSpy('countryIncome');
    const countryLong = jasmine.createSpy('countryLong');
    const countryLat = jasmine.createSpy('countryLat');
    component.countryName.subscribe(countryName);
    component.countryCapital.subscribe(countryCapital);
    component.countryRegion.subscribe(countryRegion);
    component.countryIncome.subscribe(countryIncome);
    component.countryLong.subscribe(countryLong);
    component.countryLat.subscribe(countryLat);

    component.loadCountryData('RU');

    expect(mapApiService.getCountryInfo).toHaveBeenCalledOnceWith('RU');
    expect(countryName).toHaveBeenCalledOnceWith('Russian Federation');
    expect(countryCapital).toHaveBeenCalledOnceWith('Moscow');
    expect(countryRegion).toHaveBeenCalledOnceWith('Europe & Central Asia');
    expect(countryIncome).toHaveBeenCalledOnceWith('Upper middle income');
    expect(countryLong).toHaveBeenCalledOnceWith('37.6173');
    expect(countryLat).toHaveBeenCalledOnceWith('55.7558');
  });
});
