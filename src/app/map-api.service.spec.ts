import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MapApiService } from './map-api.service';

describe('MapApiService', () => {
  let service: MapApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MapApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('requests country information over HTTPS', () => {
    service.getCountryInfo('ru').subscribe();

    const request = httpTestingController.expectOne(
      'https://api.worldbank.org/v2/country/ru?format=json'
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
