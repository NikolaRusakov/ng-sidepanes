import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntroducerComponent } from './add-introducer.component';

describe('AddIntroducerComponent', () => {
  let component: AddIntroducerComponent;
  let fixture: ComponentFixture<AddIntroducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIntroducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntroducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
