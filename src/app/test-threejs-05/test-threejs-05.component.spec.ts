import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThreejs05Component } from './test-threejs-05.component';

describe('TestThreejs05Component', () => {
  let component: TestThreejs05Component;
  let fixture: ComponentFixture<TestThreejs05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestThreejs05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThreejs05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
