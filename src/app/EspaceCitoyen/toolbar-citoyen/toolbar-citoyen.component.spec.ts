import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCitoyenComponent } from './toolbar-citoyen.component';

describe('ToolbarCitoyenComponent', () => {
  let component: ToolbarCitoyenComponent;
  let fixture: ComponentFixture<ToolbarCitoyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarCitoyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarCitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
