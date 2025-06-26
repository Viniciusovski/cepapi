@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
          this.toastr.error('Sessão expirada. Faça login novamente.');
        } else if (error.status === 403) {
          this.toastr.error('Acesso negado. Você não tem permissão para esta ação.');
        } else if (error.status === 404) {
          this.toastr.error('Recurso não encontrado.');
        } else if (error.status >= 500) {
          this.toastr.error('Erro no servidor. Tente novamente mais tarde.');
        }
        
        // Mostrar detalhes do erro em desenvolvimento
        if (!environment.production) {
          console.error('Erro na requisição:', error);
          if (error.error) {
            this.toastr.error(`Detalhes: ${error.error.message || error.error}`);
          }
        }
        
        return throwError(() => error);
      })
    );
  }
}