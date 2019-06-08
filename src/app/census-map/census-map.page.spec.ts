import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CensusMapPage } from './census-map.page';

describe('CensusMapPage', () => {
  let component: CensusMapPage;
  let fixture: ComponentFixture<CensusMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensusMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensusMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
