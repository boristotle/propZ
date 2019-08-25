import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeasePage } from './create-lease.page';

describe('CreateLeasePage', () => {
  let component: CreateLeasePage;
  let fixture: ComponentFixture<CreateLeasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
