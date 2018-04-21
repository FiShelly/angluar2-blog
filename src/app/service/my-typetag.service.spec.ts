/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyTypetagService } from './my-typetag.service';

describe('MyTypetagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTypetagService]
    });
  });

  it('should ...', inject([MyTypetagService], (service: MyTypetagService) => {
    expect(service).toBeTruthy();
  }));
});
