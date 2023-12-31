import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from '../pessoa/pessoa.model';
import { Membros } from './membros.model';
import { Projeto } from '../projeto/projeto.model';
import { MembrosId } from './membros-id.model';

@Injectable({
  providedIn: 'root'
})
export class MembrosService {

  private readonly API_URL = 'http://localhost:8080/api';

  dataChange: BehaviorSubject<Membros[]> = new BehaviorSubject<Membros[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

  get data(): Membros[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  // getAllProjetos(request): Observable<Projeto[]> {
  //   let params = new HttpParams();
  //   params = params.append('page', request.page);
  //   params = params.append('size', request.size);
  //   return this.httpClient.get<Projeto[]>(this.API_URL + '/projeto', {params: params} );
  // }


  desvincular(membrosId: MembrosId): Observable<Membros[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: membrosId
    };
    return this.httpClient.delete<Membros[]>(this.API_URL + '/membros', httpOptions);
  }

  vincular(membros: MembrosId): Observable<any> {
    return this.httpClient.post(this.API_URL + '/membros', membros);
  }

  // updateProjeto(projeto: Projeto): Observable<any> {
  //   return this.httpClient.put(this.API_URL + '/projeto/alterar/' + projeto.id , projeto);
  // }

  getAllPessoas(request): Observable<Pessoa[]> {
    let params = new HttpParams();
    params = params.append('page', request.page);
    params = params.append('size', request.size);
    return this.httpClient.get<Pessoa[]>(this.API_URL + '/pessoa', {params: params} );
  }

  getAllMembrosByProjeto(request, value): Observable<Membros[]> {
    return this.httpClient.get<Membros[]>(this.API_URL + '/membros/' +  value);
  }

  getAllProjetos(request): Observable<Projeto[]> {
    let params = new HttpParams();
    params = params.append('page', request.page);
    params = params.append('size', request.size);
    return this.httpClient.get<Projeto[]>(this.API_URL + '/projeto', {params: params} );
  }



}
