/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyArticleService } from './my-article.service';

describe('MyArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyArticleService]
    });
  });

  it('should ...', inject([MyArticleService], (service: MyArticleService) => {
    expect(service).toBeTruthy();
  }));
});
