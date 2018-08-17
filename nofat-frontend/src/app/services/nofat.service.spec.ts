import { TestBed, inject } from '@angular/core/testing';

import { NofatService } from './nofat.service';

describe('NofatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NofatService]
    });
  });

  it('should be created', inject([NofatService], (service: NofatService) => {
    expect(service).toBeTruthy();
  }));
});
