import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestUsersComponent } from './rest-users.component';

describe('RestUsersComponent', () => {
  let component: RestUsersComponent;
  let fixture: ComponentFixture<RestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
