import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderCategoriesComponent } from './under-categories.component';

describe('UnderCategoriesComponent', () => {
  let component: UnderCategoriesComponent;
  let fixture: ComponentFixture<UnderCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
