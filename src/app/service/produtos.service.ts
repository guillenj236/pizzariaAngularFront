import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from '../produtos/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  API: string = 'http://localhost:8080/api/produtos'

  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>(this.API);
  }
  save(produtos: Produtos): Observable<Produtos>{
    return this.http.post<Produtos>(this.API, produtos);
  }
  update(produtos: Produtos): Observable<Produtos>{
    return this.http.put<Produtos>(this.API, produtos);
  }
  delete(id: number): Observable<any>{
    let params = new HttpParams()
    .set('id', id.toString());
    return this.http.delete<any>(this.API, {params: params})
  }
}
