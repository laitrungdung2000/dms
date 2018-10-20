import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCollapseComponent } from './p-collapse.component';

describe('PCollapseComponent', () => {
  let component: PCollapseComponent;
  let fixture: ComponentFixture<PCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
