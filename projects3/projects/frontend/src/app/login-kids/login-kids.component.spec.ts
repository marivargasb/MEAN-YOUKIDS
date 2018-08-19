import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginKidsComponent } from './login-kids.component';

describe('LoginKidsComponent', () => {
  let component: LoginKidsComponent;
  let fixture: ComponentFixture<LoginKidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginKidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginKidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
