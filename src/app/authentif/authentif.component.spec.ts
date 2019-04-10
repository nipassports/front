import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentifComponent } from './authentif.component';

describe('AuthentifComponent', () => {
  let component: AuthentifComponent;
  let fixture: ComponentFixture<AuthentifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthentifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
