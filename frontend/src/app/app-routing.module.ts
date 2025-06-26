import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { AddressListComponent } from './components/address/address-list/address-list.component';
import { AddressFormComponent } from './components/address/address-form/address-form.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege toda a área do dashboard
    children: [
      { 
        path: 'users', 
        component: UserListComponent,
        canActivate: [AdminGuard],
        data: { roles: ['ROLE_ADMIN'] } // Exige permissão de admin
      },
      { 
        path: 'users/new', 
        component: UserFormComponent,
        canActivate: [AdminGuard],
        data: { roles: ['ROLE_ADMIN'] } // Exige permissão de admin
      },
      { 
        path: 'users/:id', 
        component: UserFormComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'addresses', 
        component: AddressListComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'addresses/new', 
        component: AddressFormComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'addresses/:id', 
        component: AddressFormComponent,
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }