import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isInitializing.pipe(
      first(isInitializing => !isInitializing), // Esperar a que la inicialización termine
      switchMap(() => this.authService.user$),  // Luego, cambiar a user$
      map(user => {
        console.log('user: ', user);
        if (user) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }
}
