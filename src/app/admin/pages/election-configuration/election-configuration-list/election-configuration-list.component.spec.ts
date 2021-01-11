import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionConfigurationListComponent } from './election-configuration-list.component';

describe('ElectionConfigurationListComponent', () => {
  let component: ElectionConfigurationListComponent;
  let fixture: ComponentFixture<ElectionConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionConfigurationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
