import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsemblePassComponent } from './ensemble-pass.component';

describe('EnsemblePassComponent', () => {
  let component: EnsemblePassComponent;
  let fixture: ComponentFixture<EnsemblePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsemblePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsemblePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
