import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDouaneComponent } from './toolbar-douane.component';

describe('ToolbarDouaneComponent', () => {
  let component: ToolbarDouaneComponent;
  let fixture: ComponentFixture<ToolbarDouaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarDouaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDouaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
