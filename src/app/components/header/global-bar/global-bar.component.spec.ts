import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalBarComponent } from './global-bar.component';

describe('GlobalBarComponent', () => {
  let component: GlobalBarComponent;
  let fixture: ComponentFixture<GlobalBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
