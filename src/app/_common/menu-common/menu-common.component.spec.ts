import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCommonComponent } from './menu-common.component';

describe('MenuCommonComponent', () => {
  let component: MenuCommonComponent;
  let fixture: ComponentFixture<MenuCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
