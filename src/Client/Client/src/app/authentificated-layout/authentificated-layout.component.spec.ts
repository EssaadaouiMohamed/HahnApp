import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificatedLayoutComponent } from './authentificated-layout.component';

describe('AuthentificatedLayoutComponent', () => {
  let component: AuthentificatedLayoutComponent;
  let fixture: ComponentFixture<AuthentificatedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthentificatedLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthentificatedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
