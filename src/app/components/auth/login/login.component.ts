import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public active = 1;
  public owlcarousel = [
    {
      title: "Welcome to E-Contractor",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    },
    {
      title: "Welcome to E-Contractor",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    },
    {
      title: "Welcome to E-Contractor",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    }
  ];
  public owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {
    this.checkRememberMe();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false] // Add remember me control
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill in the form correctly.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    const username = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    this.authService.login(username, password, rememberMe).subscribe({
      next: () => {
        this.snackBar.open('Logged in successfully!', 'Close', { 
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/dashboard/default']);
      },
      error: () => {
        this.snackBar.open('Login failed. Please check your credentials and try again.', 'Close', { 
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private checkRememberMe() {
    const token = this.authService.getToken();

    if (token) {
      this.router.navigate(['/dashboard/default']);
    }
  }

  private markFormGroupTouched(formGroup: UntypedFormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
