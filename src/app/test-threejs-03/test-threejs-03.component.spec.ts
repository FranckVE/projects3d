import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThreejs03Component } from './test-threejs-03.component';

describe('TestThreejs03Component', () => {
  let component: TestThreejs03Component;
  let fixture: ComponentFixture<TestThreejs03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestThreejs03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThreejs03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
