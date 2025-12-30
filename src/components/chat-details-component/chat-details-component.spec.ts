import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDetailsComponent } from './chat-details-component';

describe('ChatDetailsComponent', () => {
  let component: ChatDetailsComponent;
  let fixture: ComponentFixture<ChatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
