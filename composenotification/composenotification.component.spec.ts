
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComposenotificationComponent } from './composenotification.component';

describe('ComposenotificationComponent', () => {
  let component: ComposenotificationComponent;
  let fixture: ComponentFixture<ComposenotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposenotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposenotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
