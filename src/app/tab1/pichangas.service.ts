import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlayerSearches} from "../interfaces/playerSearches";

@Injectable({
  providedIn: 'root'
})
export class PichangasService {

  constructor(private http: HttpClient) {}

  getPichangas(): Observable<PlayerSearches[]> {
    return this.http.get<PlayerSearches[]>('https://torneoapp.up.railway.app/api/playerSearches');
  }
}
