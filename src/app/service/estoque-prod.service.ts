import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EstoqueProd } from '../estoqueProd/estoqueProd';

@Injectable({
  providedIn: 'root'
})
export class EstoqueProdService {

  API: string  = 'http://localhost:8080/api/estoqueProd';

  http = inject(HttpClient);

  constructor() { }

  listAll():  Observable<EstoqueProd[]>{
    return this.http.get<EstoqueProd[]>(this.API);
  }
  save(estoqueProd: EstoqueProd): Observable<EstoqueProd>{
    return this.http.post<EstoqueProd>(this.API, estoqueProd);
  }
  update(estoqueProd: EstoqueProd): Observable<EstoqueProd>{
    return this.http.put<EstoqueProd>(this.API, estoqueProd);
  }
  delete(id: number): Observable<any>{
    let params = new HttpParams()
    .set('id', id.toString());

  return this.http.delete<any>(this.API, {params: params} ); 
  }
}
