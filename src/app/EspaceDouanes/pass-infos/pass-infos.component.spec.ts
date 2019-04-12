import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassInfosComponent } from './pass-infos.component';

describe('PassInfosComponent', () => {
  let component: PassInfosComponent;
  let fixture: ComponentFixture<PassInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
