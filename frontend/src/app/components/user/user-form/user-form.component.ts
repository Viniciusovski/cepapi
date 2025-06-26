import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User, UserRequest } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId?: number;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      role: ['ROLE_USER', Validators.required]
    });
  }

  get f() { return this.userForm.controls; }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUser(this.userId);
        // Remover validação de senha obrigatória em modo de edição
        this.f.password.clearValidators();
        this.f.password.updateValueAndValidity();
      }
    });
  }

  loadUser(id: number): void {
    this.loading = true;
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          role: user.role
        });
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar usuário');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.userForm.invalid) {
      return;
    }
    
    this.loading = true;
    const userData: UserRequest = this.userForm.value;
    
    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => {
          this.toastr.success('Usuário atualizado com sucesso');
          this.router.navigate(['/dashboard/users']);
        },
        error: (err) => {
          this.toastr.error('Erro ao atualizar usuário: ' + (err.error?.message || ''));
          this.loading = false;
        }
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.toastr.success('Usuário criado com sucesso');
          this.router.navigate(['/dashboard/users']);
        },
        error: (err) => {
          this.toastr.error('Erro ao criar usuário: ' + (err.error?.message || ''));
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/users']);
  }
}