import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenCaptureComponent } from './screen-capture.component';

describe('ScreenCaptureComponent', () => {
  let component: ScreenCaptureComponent;
  let fixture: ComponentFixture<ScreenCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenCaptureComponent]
    });
    fixture = TestBed.createComponent(ScreenCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
