import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialReasonComponent } from './social-reason.component';

describe('SocialReasonComponent', () => {
  let component: SocialReasonComponent;
  let fixture: ComponentFixture<SocialReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
