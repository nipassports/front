import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilGouvComponent } from './accueil-gouv.component';

describe('AccueilGouvComponent', () => {
  let component: AccueilGouvComponent;
  let fixture: ComponentFixture<AccueilGouvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilGouvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilGouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
