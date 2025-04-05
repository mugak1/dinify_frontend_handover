import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgtNotificationsComponent } from './mgt-notifications.component';

describe('MgtNotificationsComponent', () => {
  let component: MgtNotificationsComponent;
  let fixture: ComponentFixture<MgtNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MgtNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MgtNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
