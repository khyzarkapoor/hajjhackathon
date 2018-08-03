
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InboxnotificationComponent } from './inboxnotification.component';

describe('InboxnotificationComponent', () => {
  let component: InboxnotificationComponent;
  let fixture: ComponentFixture<InboxnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
