import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConsolesComponent } from './game-consoles.component';

describe('GameConsolesComponent', () => {
  let component: GameConsolesComponent;
  let fixture: ComponentFixture<GameConsolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameConsolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConsolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
