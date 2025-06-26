import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    // Obtém a URL de retorno dos parâmetros da rota ou usa '/dashboard' como padrão
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    this.authService.login({
      email: this.f.email.value,
      password: this.f.password.value
    }).subscribe({
      next: () => {
        this.toastr.success('Login realizado com sucesso');
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        this.toastr.error('Credenciais inválidas');
        this.loading = false;
      }
    });
  }
}