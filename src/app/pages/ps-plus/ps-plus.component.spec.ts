import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsPlusComponent } from './ps-plus.component';

describe('PsPlusComponent', () => {
  let component: PsPlusComponent;
  let fixture: ComponentFixture<PsPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
