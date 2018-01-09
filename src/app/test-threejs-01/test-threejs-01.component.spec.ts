import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThreejs01Component } from './test-threejs-01.component';

describe('TestThreejs01Component', () => {
  let component: TestThreejs01Component;
  let fixture: ComponentFixture<TestThreejs01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestThreejs01Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThreejs01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
