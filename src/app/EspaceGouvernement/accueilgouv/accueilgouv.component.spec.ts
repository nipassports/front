import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilgouvComponent } from './accueilgouv.component';

describe('AccueilgouvComponent', () => {
  let component: AccueilgouvComponent;
  let fixture: ComponentFixture<AccueilgouvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilgouvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilgouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
