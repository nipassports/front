import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagePassComponent } from './affichage-pass.component';

describe('AffichagePassComponent', () => {
  let component: AffichagePassComponent;
  let fixture: ComponentFixture<AffichagePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichagePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichagePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
