import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionConfigurationCandidatesComponent } from './election-configuration-candidates.component';

describe('ElectionConfigurationCandidatesComponent', () => {
  let component: ElectionConfigurationCandidatesComponent;
  let fixture: ComponentFixture<ElectionConfigurationCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionConfigurationCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionConfigurationCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
