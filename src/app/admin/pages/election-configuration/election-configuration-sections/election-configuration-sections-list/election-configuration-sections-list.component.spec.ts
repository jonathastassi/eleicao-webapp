import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionConfigurationSectionsListComponent } from './election-configuration-sections-list.component';

describe('ElectionConfigurationSectionsListComponent', () => {
  let component: ElectionConfigurationSectionsListComponent;
  let fixture: ComponentFixture<ElectionConfigurationSectionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionConfigurationSectionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionConfigurationSectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
