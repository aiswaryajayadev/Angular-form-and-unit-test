import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent], // LoginComponent should be in imports array
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with username and password fields', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('should display validation errors for empty username and password fields', () => {
    component.loginForm.controls['username'].markAsTouched();
    component.loginForm.controls['password'].markAsTouched();
    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('#username + .validate'));
    const passwordError = fixture.debugElement.query(By.css('#password + .validate'));

    expect(usernameError).toBeTruthy();
    expect(usernameError.nativeElement.textContent).toContain('*Name is required.');
    expect(passwordError).toBeTruthy();
    expect(passwordError.nativeElement.textContent).toContain('*Password is required.');
  });

  it('should display validation errors for short username and password fields', () => {
    component.loginForm.controls['username'].setValue('abc');
    component.loginForm.controls['password'].setValue('abc');
    component.loginForm.controls['username'].markAsTouched();
    component.loginForm.controls['password'].markAsTouched();
    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('#username + .validate'));
    const passwordError = fixture.debugElement.query(By.css('#password + .validate'));

    expect(usernameError).toBeTruthy();
    expect(usernameError.nativeElement.textContent).toContain('*Name must be at least 4 characters long.');
    expect(passwordError).toBeTruthy();
    expect(passwordError.nativeElement.textContent).toContain('*Password must be at least 4 characters long.');
  });

  it('should submit form with valid data', () => {
    component.loginForm.controls['username'].setValue('validUsername');
    component.loginForm.controls['password'].setValue('validPassword');
    fixture.detectChanges();

    spyOn(component, 'onSubmit');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
