import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from './projeto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from '../pessoa/pessoa.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProjectsModalComponent } from '../pessoa/projects-modal/projects-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private readonly API_URL = 'http://localhost:8080/api';

  dataChange: BehaviorSubject<Projeto[]> = new BehaviorSubject<Projeto[]>([]);
  dialogData: any;
  resultFromDelete:number = 1;
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ProjectsModalComponent, any> | undefined;

  constructor(private httpClient: HttpClient,public matDialog: MatDialog) {}

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


  deleteProjeto(id: number) {
    this.httpClient.delete<Projeto[]>(this.API_URL + '/projeto/' +  id).subscribe(
      data => console.log('success', data),
      error => {
        console.log('error', error)
        this.openModal();
      }

    )

  }

  private handleError(error: Response): Promise<Response>{
    console.error('An error occurred', error);
    // alert(error.json());
    this.openModal();

    this.resultFromDelete= 0;
    return Promise.reject(0);
 };

 openModal() {
  this.dialogConfig.id = "projects-modal-component";
  this.dialogConfig.height = "250px";
  this.dialogConfig.width = "500px";
  this.modalDialog = this.matDialog.open(ProjectsModalComponent, this.dialogConfig);
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
