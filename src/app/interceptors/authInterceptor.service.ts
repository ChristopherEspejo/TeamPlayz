import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("authinterceptor")
        if (error.status === 401) {
          // Si recibe un error 401 Unauthorized, cierra la sesión y redirige al inicio de sesión
          this.authService.logout().then(() => {
            this.router.navigate(['/auth']);
          });
        }
        return throwError(() => error);
      })
    );
  }
}
