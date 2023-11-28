import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadLoginService {
  API: string = 'http://localhost:8080/api/usuarios/novo';

  http = inject(HttpClient);

  constructor() { }

  logar(dadosLogin: any): Observable<any> {
    return this.http.post<any>(`${this.API}`, dadosLogin);
  }

  deslogar(): Observable<any> {
    return this.http.get<any>(`${this.API}/deslogar`);
  }

}
