import { TestBed, inject } from '@angular/core/testing';

import { ThreePrimitivesService } from './three-primitives.service';

describe('ThreePrimitivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreePrimitivesService]
    });
  });

  it('should be created', inject([ThreePrimitivesService], (service: ThreePrimitivesService) => {
    expect(service).toBeTruthy();
  }));
});
