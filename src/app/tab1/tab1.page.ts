import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {PichangasService} from "./pichangas.service";
import {Router} from "@angular/router";
import {PlayerSearches} from "../interfaces/playerSearches";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private authSubscription: Subscription|null = null;
  playerSeaches: PlayerSearches[] = [];
  constructor(private authService: AuthService,
              private pichangaService: PichangasService,
              private router: Router ) {
  }
  ngOnInit() {
    this.authSubscription = this.authService.getIdToken().subscribe({
      next: token => {
        if (token) {
          this.getPichangas().subscribe({
            next: pichangas => {
              this.playerSeaches = pichangas;
            },
            error: error => {
              console.error('Error al obtener pichangas', error);
            }
          });
        }
      },
      error: error => {
        console.error('Error al obtener token', error);
      }
    });
  }

   getPichangas(){
     return this.pichangaService.getPichangas()
  }



  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
      this.authSubscription = null;
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  doRefresh(event: any) {
    console.log('Iniciando operación async');

    this.getPichangas().subscribe({
      next: pichangas => {
        this.playerSeaches = pichangas;
        console.log('Operación async ha terminado');
        event.target.complete();
      },
      error: error => {
        console.error('Error al obtener pichangas', error);
        // En caso de que ocurra un error, aún deberías terminar el refresco
        event.target.complete();
      }
    });
  }


}
