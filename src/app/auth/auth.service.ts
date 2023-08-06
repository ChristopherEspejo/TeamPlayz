import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, from, of} from 'rxjs';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import {take} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  private isInitializingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isInitializing: Observable<boolean> = this.isInitializingSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, user => {
      this.userSubject.next(user);
      this.isInitializingSubject.next(false); // La inicialización ha terminado
    });
  }

  public getIdToken(): Observable<string | null> {
    if (this.auth.currentUser) {
      return from(this.auth.currentUser.getIdToken());
    } else {
      return of(null);
    }
  }

  public logout(): Promise<void> {
    return this.auth.signOut().then(() => {
      this.userSubject.next(null);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
      throw error;  // Lanzar el error para que pueda ser manejado en el componente
    });
  }
}
