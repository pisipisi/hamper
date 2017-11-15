import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Placeorder2Component } from './placeorder2.component';

describe('Placeorder2Component', () => {
  let component: Placeorder2Component;
  let fixture: ComponentFixture<Placeorder2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Placeorder2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Placeorder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
