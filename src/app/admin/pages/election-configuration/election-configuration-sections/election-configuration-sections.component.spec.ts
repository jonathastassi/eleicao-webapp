import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionConfigurationSectionsComponent } from './election-configuration-sections.component';

describe('ElectionConfigurationSectionsComponent', () => {
  let component: ElectionConfigurationSectionsComponent;
  let fixture: ComponentFixture<ElectionConfigurationSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionConfigurationSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionConfigurationSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
