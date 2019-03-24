import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarGouvComponent } from './toolbar-gouv.component';

describe('ToolbarGouvComponent', () => {
  let component: ToolbarGouvComponent;
  let fixture: ComponentFixture<ToolbarGouvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarGouvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarGouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
