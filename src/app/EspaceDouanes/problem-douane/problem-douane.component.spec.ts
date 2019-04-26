import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDouaneComponent } from './problem-douane.component';

describe('ProblemDouaneComponent', () => {
  let component: ProblemDouaneComponent;
  let fixture: ComponentFixture<ProblemDouaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemDouaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemDouaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
