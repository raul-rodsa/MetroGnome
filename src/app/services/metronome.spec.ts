import { TestBed } from '@angular/core/testing';

import { Metronome } from './metronome';

describe('Metronome', () => {
  let service: Metronome;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Metronome);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
