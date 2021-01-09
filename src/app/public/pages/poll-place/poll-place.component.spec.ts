import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPlaceComponent } from './poll-place.component';

describe('PollPlaceComponent', () => {
  let component: PollPlaceComponent;
  let fixture: ComponentFixture<PollPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
