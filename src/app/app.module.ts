import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/authInterceptor.service";
import {TokenInterceptor} from "./interceptors/token-interceptor.service";

const firebaseConfig = {
  apiKey: "AIzaSyDyowJ0y4VKVqfnYhvChayJ7faNUZG2Csc",
  authDomain: "teamplay-2db94.firebaseapp.com",
  projectId: "teamplay-2db94",
  storageBucket: "teamplay-2db94.appspot.com",
  messagingSenderId: "774350942563",
  appId: "1:774350942563:web:92cbb9b2c68834d114a356"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), HttpClientModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},  // Tu interceptor existente
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}  // Tu nuevo interceptor
  ],
  bootstrap: [AppComponent],
  exports: []
})

export class AppModule {
}
