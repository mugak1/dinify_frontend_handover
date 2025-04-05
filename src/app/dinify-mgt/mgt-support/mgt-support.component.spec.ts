import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgtSupportComponent } from './mgt-support.component';

describe('MgtSupportComponent', () => {
  let component: MgtSupportComponent;
  let fixture: ComponentFixture<MgtSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MgtSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MgtSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
