import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeasePage } from './new-lease.page';

describe('NewLeasePage', () => {
  let component: NewLeasePage;
  let fixture: ComponentFixture<NewLeasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLeasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLeasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
