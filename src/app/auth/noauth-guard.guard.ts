import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isInitializing.pipe(
      first(isInitializing => !isInitializing), // Esperar a que la inicialización termine
      switchMap(() => this.authService.user$),  // Luego, cambiar a user$
      map(user => {
        if (user) {
          this.router.navigate(['/play']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
