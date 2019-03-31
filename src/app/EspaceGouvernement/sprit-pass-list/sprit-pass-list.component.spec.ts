import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpritPassListComponent } from './sprit-pass-list.component';

describe('SpritPassListComponent', () => {
  let component: SpritPassListComponent;
  let fixture: ComponentFixture<SpritPassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpritPassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpritPassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
