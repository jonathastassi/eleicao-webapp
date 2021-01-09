import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionConfigurationComponent } from './election-configuration.component';

describe('ElectionConfigurationComponent', () => {
  let component: ElectionConfigurationComponent;
  let fixture: ComponentFixture<ElectionConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
