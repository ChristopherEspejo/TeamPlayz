import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('https://torneoapp.up.railway.app')) {
      return this.authService.getIdToken().pipe(
        switchMap(token => {
          // Clona la solicitud y establece el encabezado de autorización
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          // Maneja la solicitud clonada y devuélvela en lugar de la original
          return next.handle(authReq);
        })
      );
    }
    // Si la URL no comienza con la URL de tu API, maneja la solicitud original
    return next.handle(req);
  }
}
