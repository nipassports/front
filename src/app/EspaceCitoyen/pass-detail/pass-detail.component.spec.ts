import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDetailComponent } from './pass-detail.component';

describe('PassDetailComponent', () => {
  let component: PassDetailComponent;
  let fixture: ComponentFixture<PassDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
