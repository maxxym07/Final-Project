import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesDetailsComponent } from './games-details.component';

describe('GamesDetailsComponent', () => {
  let component: GamesDetailsComponent;
  let fixture: ComponentFixture<GamesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
