import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetgamesComponent } from './betgames.component';

describe('BetgamesComponent', () => {
  let component: BetgamesComponent;
  let fixture: ComponentFixture<BetgamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetgamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
