import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLoadImage01Component } from './test-load-image-01.component';

describe('TestLoadImage01Component', () => {
  let component: TestLoadImage01Component;
  let fixture: ComponentFixture<TestLoadImage01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLoadImage01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLoadImage01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
