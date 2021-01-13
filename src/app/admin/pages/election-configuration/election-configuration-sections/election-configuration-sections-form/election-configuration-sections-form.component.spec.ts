import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionConfigurationSectionsFormComponent } from './election-configuration-sections-form.component';

describe('ElectionConfigurationSectionsFormComponent', () => {
  let component: ElectionConfigurationSectionsFormComponent;
  let fixture: ComponentFixture<ElectionConfigurationSectionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionConfigurationSectionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionConfigurationSectionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
