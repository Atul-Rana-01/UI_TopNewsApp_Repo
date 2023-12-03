import { TestBed } from '@angular/core/testing';

import { TopnewsService } from './topnews.service';

describe('TopnewsService', () => {
  let service: TopnewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopnewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
