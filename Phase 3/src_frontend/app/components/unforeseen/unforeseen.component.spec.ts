import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnforeseenComponent } from './unforeseen.component';

describe('UnforeseenComponent', () => {
  let component: UnforeseenComponent;
  let fixture: ComponentFixture<UnforeseenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnforeseenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnforeseenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
