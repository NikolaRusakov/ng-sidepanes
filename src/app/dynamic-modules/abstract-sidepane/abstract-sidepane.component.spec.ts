import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractSidepaneComponent } from './abstract-sidepane.component';

describe('AbstractSidepaneComponent', () => {
  let component: AbstractSidepaneComponent;
  let fixture: ComponentFixture<AbstractSidepaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractSidepaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractSidepaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
