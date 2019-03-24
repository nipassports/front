import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthcitoyenComponent } from './authcitoyen.component';

describe('AuthcitoyenComponent', () => {
  let component: AuthcitoyenComponent;
  let fixture: ComponentFixture<AuthcitoyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthcitoyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthcitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
