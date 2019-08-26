import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertyPage } from './edit-property.page';

describe('EditPropertyPage', () => {
  let component: EditPropertyPage;
  let fixture: ComponentFixture<EditPropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPropertyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
