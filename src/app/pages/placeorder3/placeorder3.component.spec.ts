import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Placeorder3Component } from './placeorder3.component';

describe('Placeorder3Component', () => {
  let component: Placeorder3Component;
  let fixture: ComponentFixture<Placeorder3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Placeorder3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Placeorder3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
