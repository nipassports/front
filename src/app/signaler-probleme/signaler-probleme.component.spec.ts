import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalerProblemeComponent } from './signaler-probleme.component';

describe('SignalerProblemeComponent', () => {
  let component: SignalerProblemeComponent;
  let fixture: ComponentFixture<SignalerProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalerProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalerProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
