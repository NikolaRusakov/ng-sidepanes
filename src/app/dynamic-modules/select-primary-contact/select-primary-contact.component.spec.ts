import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPrimaryContactComponent } from './select-primary-contact.component';

describe('SelectPrimaryContactComponent', () => {
  let component: SelectPrimaryContactComponent;
  let fixture: ComponentFixture<SelectPrimaryContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPrimaryContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPrimaryContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
