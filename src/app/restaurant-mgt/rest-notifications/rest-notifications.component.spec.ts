import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestNotificationsComponent } from './rest-notifications.component';

describe('RestNotificationsComponent', () => {
  let component: RestNotificationsComponent;
  let fixture: ComponentFixture<RestNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
