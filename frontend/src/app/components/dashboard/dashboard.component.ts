import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  userInitials = '';
  currentPageTitle = 'Dashboard';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.userInitials = this.getInitials(this.user.name);
    }
    
    // Atualizar título da página
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setCurrentPageTitle();
    });
    
    this.setCurrentPageTitle();
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  setCurrentPageTitle(): void {
    const url = this.router.url;
    if (url.includes('/users')) {
      this.currentPageTitle = 'Gerenciamento de Usuários';
    } else if (url.includes('/addresses')) {
      this.currentPageTitle = 'Gerenciamento de Endereços';
    } else {
      this.currentPageTitle = 'Dashboard';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}