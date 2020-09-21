import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponComponent } from './admin-coupon.component';

describe('AdminCouponComponent', () => {
  let component: AdminCouponComponent;
  let fixture: ComponentFixture<AdminCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
