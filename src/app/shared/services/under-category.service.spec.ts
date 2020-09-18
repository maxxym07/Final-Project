import { TestBed } from '@angular/core/testing';

import { UnderCategoryService } from './under-category.service';

describe('UnderCategoryService', () => {
  let service: UnderCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnderCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
