import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassIssuesComponent } from './pass-issues.component';

describe('PassIssuesComponent', () => {
  let component: PassIssuesComponent;
  let fixture: ComponentFixture<PassIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
