import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDinersComponent } from './menu-diners.component';

describe('MenuDinersComponent', () => {
  let component: MenuDinersComponent;
  let fixture: ComponentFixture<MenuDinersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDinersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuDinersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
