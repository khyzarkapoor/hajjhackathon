
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HousingComponent } from './housing.component';

describe('HousingComponent', () => {
  let component: HousingComponent;
  let fixture: ComponentFixture<HousingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
