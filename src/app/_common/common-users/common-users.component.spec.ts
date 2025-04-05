import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonUsersComponent } from './common-users.component';

describe('CommonUsersComponent', () => {
  let component: CommonUsersComponent;
  let fixture: ComponentFixture<CommonUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
