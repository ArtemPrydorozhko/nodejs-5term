import { TestBed } from '@angular/core/testing';

import { ServerService } from './http.service';

describe('ServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerService = TestBed.get(ServerService);
    expect(service).toBeTruthy();
  });
});
