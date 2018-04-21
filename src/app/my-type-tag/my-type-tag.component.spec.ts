/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyTypeTagComponent } from './my-type-tag.component';

describe('MyTypeTagComponent', () => {
  let component: MyTypeTagComponent;
  let fixture: ComponentFixture<MyTypeTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTypeTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTypeTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
