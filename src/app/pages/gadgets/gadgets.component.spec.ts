import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetsComponent } from './gadgets.component';

describe('GadgetsComponent', () => {
  let component: GadgetsComponent;
  let fixture: ComponentFixture<GadgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GadgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
