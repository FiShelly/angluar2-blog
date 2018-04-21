/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyAuthorService } from './my-author.service';

describe('MyAuthorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAuthorService]
    });
  });

  it('should ...', inject([MyAuthorService], (service: MyAuthorService) => {
    expect(service).toBeTruthy();
  }));
});
