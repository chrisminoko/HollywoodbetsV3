import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportcountriesComponent } from './sportcountries.component';

describe('SportcountriesComponent', () => {
  let component: SportcountriesComponent;
  let fixture: ComponentFixture<SportcountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportcountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportcountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
