import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvproblemComponent } from './gouvproblem.component';

describe('GouvproblemComponent', () => {
  let component: GouvproblemComponent;
  let fixture: ComponentFixture<GouvproblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GouvproblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
