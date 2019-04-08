import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaDouaneComponent } from './visa-douane.component';

describe('VisaDouaneComponent', () => {
  let component: VisaDouaneComponent;
  let fixture: ComponentFixture<VisaDouaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaDouaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaDouaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
