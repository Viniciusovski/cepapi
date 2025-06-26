import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree,
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Verifica se o usuário está autenticado
    if (this.authService.isAuthenticated()) {
      // Verifica se a rota requer permissão de admin
      if (next.data['roles'] && next.data['roles'].includes('ROLE_ADMIN')) {
        if (this.authService.isAdmin()) {
          return true;
        } else {
          this.toastr.error('Acesso negado. Permissão de administrador necessária.');
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
      
      return true;
    }
    
    // Usuário não autenticado - redireciona para login
    this.toastr.warning('Você precisa estar logado para acessar esta página');
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
}