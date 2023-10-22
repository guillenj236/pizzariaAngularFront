import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from '../pizza/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  API: string = 'http://localhost:8080/api/pizza'

  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Pizza[]>{
    return this.http.get<Pizza[]>(this.API);
  }
  save(pizza: Pizza): Observable<Pizza>{
    return this.http.post<Pizza>(this.API, pizza);
  }
  update(pizza: Pizza): Observable<Pizza>{
    return this.http.put<Pizza>(this.API, pizza);
  }
  delete(id: number): Observable<any>{
    let params = new HttpParams()
    .set('id', id.toString());
    return this.http.delete<any>(this.API, {params: params});
  }
}
