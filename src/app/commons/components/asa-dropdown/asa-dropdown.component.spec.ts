import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsaDropdownComponent } from './asa-dropdown.component';

describe('AsaDropdownComponent', () => {
  let component: AsaDropdownComponent;
  let fixture: ComponentFixture<AsaDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsaDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
