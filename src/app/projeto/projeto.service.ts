import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from './projeto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from '../pessoa/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private readonly API_URL = 'http://localhost:8080/api';

  dataChange: BehaviorSubject<Projeto[]> = new BehaviorSubject<Projeto[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

  get data(): Projeto[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllProjetos(request): Observable<Projeto[]> {
    let params = new HttpParams();
    params = params.append('page', request.page);
    params = params.append('size', request.size);
    return this.httpClient.get<Projeto[]>(this.API_URL + '/projeto', {params: params} );
  }


  deleteProjeto(id: number): Observable<Projeto[]> {
    return this.httpClient.delete<Projeto[]>(this.API_URL + '/projeto/' +  id);
  }

  addProjeto(projeto: Projeto): Observable<any> {
    return this.httpClient.post(this.API_URL + '/projeto', projeto);
  }

  updateProjeto(projeto: Projeto): Observable<any> {
    return this.httpClient.put(this.API_URL + '/projeto/alterar/' + projeto.id , projeto);
  }

  getAllPessoas(request): Observable<Pessoa[]> {
    let params = new HttpParams();
    params = params.append('page', request.page);
    params = params.append('size', request.size);
    return this.httpClient.get<Pessoa[]>(this.API_URL + '/pessoa', {params: params} );
  }



}
