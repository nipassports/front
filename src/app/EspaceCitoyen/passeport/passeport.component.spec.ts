import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasseportComponent } from './passeport.component';

describe('PasseportComponent', () => {
  let component: PasseportComponent;
  let fixture: ComponentFixture<PasseportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasseportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasseportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
