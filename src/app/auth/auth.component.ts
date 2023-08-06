import {Component, OnInit} from '@angular/core';
import {Auth, User, onAuthStateChanged, GoogleAuthProvider, signInWithCredential} from '@angular/fire/auth';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import '@codetrix-studio/capacitor-google-auth'
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";
import {ToastController} from "@ionic/angular";
import {AuthService} from "./auth.service";
import {LoadingController} from "@ionic/angular";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  user$: Observable<User | null>;
   loading!: boolean;

  constructor(private auth: Auth, private router: Router,
              private toastController: ToastController,
              private authService: AuthService,
              private loadingController: LoadingController) {
    GoogleAuth.initialize()
    this.user$ = of(null);
  }

  async ngOnInit() {
    // const loading = await this.loadingController.create({
    //   message: 'Cargando...',
    // });
    // await loading.present();
    //
    // this.authService.user$.subscribe(async (user: User | null) => {
    //   if (user) {
    //     // Si el usuario ya está autenticado, redirígelo a la ruta play/tabs.
    //     this.router.navigate(['/play/tabs']);
    //
    //   } else {
    //     // Aquí puedes poner cualquier lógica adicional si el usuario no está autenticado
    //     await loading.dismiss();
    //   }
    //   await loading.dismiss();
    // });
  }



  async signInWithGoogle() {
    try {
      const googleUser = await GoogleAuth.signIn();

      if (googleUser) {
        const googleIdToken = googleUser.authentication.idToken;
        const credential = GoogleAuthProvider.credential(googleIdToken);
        const firebaseUserCredential = await signInWithCredential(this.auth, credential);
        const firebaseIdToken = await firebaseUserCredential.user.getIdToken();

        console.log('Firebase User ID Token: ', firebaseIdToken);

        await this.router.navigate(['/play/tabs']);
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      await this.presentToast('Error durante el inicio de sesión: ' + JSON.stringify(error));
    }
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }


}
