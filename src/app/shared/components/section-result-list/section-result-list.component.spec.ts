import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionResultListComponent } from './section-result-list.component';

describe('SectionResultListComponent', () => {
  let component: SectionResultListComponent;
  let fixture: ComponentFixture<SectionResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
