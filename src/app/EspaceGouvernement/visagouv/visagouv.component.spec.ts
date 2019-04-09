import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisagouvComponent } from './visagouv.component';

describe('VisagouvComponent', () => {
  let component: VisagouvComponent;
  let fixture: ComponentFixture<VisagouvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisagouvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisagouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
