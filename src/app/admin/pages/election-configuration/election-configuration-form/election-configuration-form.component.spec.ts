import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionConfigurationFormComponent } from './election-configuration-form.component';

describe('ElectionConfigurationFormComponent', () => {
  let component: ElectionConfigurationFormComponent;
  let fixture: ComponentFixture<ElectionConfigurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionConfigurationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
