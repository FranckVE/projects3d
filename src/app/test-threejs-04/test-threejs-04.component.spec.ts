import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThreejs04Component } from './test-threejs-04.component';

describe('TestThreejs04Component', () => {
  let component: TestThreejs04Component;
  let fixture: ComponentFixture<TestThreejs04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestThreejs04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThreejs04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
