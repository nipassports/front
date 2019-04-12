import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGouvComponent } from './auth-gouv.component';

describe('AuthGouvComponent', () => {
  let component: AuthGouvComponent;
  let fixture: ComponentFixture<AuthGouvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthGouvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
