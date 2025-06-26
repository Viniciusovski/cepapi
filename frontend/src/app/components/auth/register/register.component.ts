import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    const { name, email, password } = this.registerForm.value;
    
    this.authService.register({ name, email, password, role: 'ROLE_USER' }).subscribe({
      next: () => {
        this.toastr.success('Registro realizado com sucesso! Faça login para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error('Erro ao registrar: ' + (err.error?.message || 'Verifique os dados e tente novamente.'));
        this.loading = false;
      }
    });
  }
}