import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCustomComponent } from './auth-custom.component';

describe('AuthCustomComponent', () => {
  let component: AuthCustomComponent;
  let fixture: ComponentFixture<AuthCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
