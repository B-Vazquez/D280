import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-map',
  template: ''
})
class MapStubComponent {
  @Output() countryName = new EventEmitter<string>();
  @Output() countryCapital = new EventEmitter<string>();
  @Output() countryRegion = new EventEmitter<string>();
  @Output() countryIncome = new EventEmitter<string>();
  @Output() countryLong = new EventEmitter<string>();
  @Output() countryLat = new EventEmitter<string>();
}

@Component({
  selector: 'app-map-info',
  template: ''
})
class MapInfoStubComponent {
  @Input() countryName = '';
  @Input() countryCapital = '';
  @Input() countryRegion = '';
  @Input() countryIncome = '';
  @Input() countryLong = '';
  @Input() countryLat = '';
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MapStubComponent, MapInfoStubComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('passes selected country data from the map to the info panel', () => {
    const map = fixture.debugElement.query(By.directive(MapStubComponent))
      .componentInstance as MapStubComponent;
    const info = fixture.debugElement.query(By.directive(MapInfoStubComponent))
      .componentInstance as MapInfoStubComponent;

    map.countryName.emit('Russia');
    map.countryCapital.emit('Moscow');
    map.countryRegion.emit('Europe & Central Asia');
    map.countryIncome.emit('Upper middle income');
    map.countryLong.emit('37.6173');
    map.countryLat.emit('55.7558');
    fixture.detectChanges();

    expect(info.countryName).toBe('Russia');
    expect(info.countryCapital).toBe('Moscow');
    expect(info.countryRegion).toBe('Europe & Central Asia');
    expect(info.countryIncome).toBe('Upper middle income');
    expect(info.countryLong).toBe('37.6173');
    expect(info.countryLat).toBe('55.7558');
  });
});
