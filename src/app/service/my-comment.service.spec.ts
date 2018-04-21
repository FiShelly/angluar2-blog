/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyCommentService } from './my-comment.service';

describe('MyCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCommentService]
    });
  });

  it('should ...', inject([MyCommentService], (service: MyCommentService) => {
    expect(service).toBeTruthy();
  }));
});
