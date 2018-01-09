import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThreejs02Component } from './test-threejs-02.component';

describe('TestThreejs02Component', () => {
  let component: TestThreejs02Component;
  let fixture: ComponentFixture<TestThreejs02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestThreejs02Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThreejs02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
