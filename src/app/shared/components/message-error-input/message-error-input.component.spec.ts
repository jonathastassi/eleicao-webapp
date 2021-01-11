import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageErrorInputComponent } from './message-error-input.component';

describe('MessageErrorInputComponent', () => {
  let component: MessageErrorInputComponent;
  let fixture: ComponentFixture<MessageErrorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageErrorInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageErrorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
