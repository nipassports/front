import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassViewComponent } from './pass-view.component';

describe('PassViewComponent', () => {
  let component: PassViewComponent;
  let fixture: ComponentFixture<PassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
