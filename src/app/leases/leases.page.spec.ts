import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasesPage } from './leases.page';

describe('LeasesPage', () => {
  let component: LeasesPage;
  let fixture: ComponentFixture<LeasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
