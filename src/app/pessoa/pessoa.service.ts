import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Pessoa } from './pessoa.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeletePessoaComponent } from './delete-pessoa/delete-pessoa.component';
import { Component, OnInit } from '@angular/core';
import { ProjectsModalComponent } from './projects-modal/projects-modal.component';






@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly API_URL = 'http://localhost:8080/api';


  dataChange: BehaviorSubject<Pessoa[]> = new BehaviorSubject<Pessoa[]>([]);
  dialogData: any;
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ProjectsModalComponent, any> | undefined;
  resultFromDelete:number;


  constructor(private httpClient: HttpClient, public matDialog: MatDialog) {}

  get data(): Pessoa[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllPessoas(request): Observable<Pessoa[]> {
    let params = new HttpParams();
    params = params.append('page', request.page);
    params = params.append('size', request.size);
    return this.httpClient.get<Pessoa[]>(this.API_URL + '/pessoa', {params: params} );
  }

  // DEMO ONLY, you can find working methods below
  addIssue(pessoa: Pessoa): void {
    this.dialogData = pessoa;
  }

  // updateIssue(issue: Pessoa): void {
  //   this.dialogData = issue;
  // }

  deletePessoa(id: number) {
    return this.httpClient.delete<Pessoa[]>(this.API_URL + '/pessoa/' +  id).subscribe(
      data => console.log('success', data),
      error => {
        console.log('error', error)
        this.openModal();
      });
  }

  openModal() {
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "250px";
    this.dialogConfig.width = "500px";
    this.modalDialog = this.matDialog.open(ProjectsModalComponent, this.dialogConfig);
  }

//   private handleError(error: Response): Promise<Response>{
//     // console.error('An error occurred', error);
//     // alert(error.json());

//    this.resultFromDelete= 0;
//     return Promise.reject(0);
//  }



  // ADD, POST METHOD
  addPessoa(pessoa: Pessoa): Observable<any> {
    return this.httpClient.post(this.API_URL + '/pessoa', pessoa);
  }

  updatePessoa(pessoa: Pessoa): Observable<any> {
    return this.httpClient.put(this.API_URL + '/pessoa/alterar/' + pessoa.idPessoa , pessoa);
  }

}



 //REAL LIFE CRUD Methods I've used in projects. ToasterService uses Material Toasts for displaying messages:



    // UPDATE, PUT METHOD
  //    updateItem(kanbanItem: KanbanItem): void {
  //   this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
  //       this.dialogData = kanbanItem;
  //       this.toasterService.showToaster('Successfully edited', 3000);
  //     },
  //     (err: HttpErrorResponse) => {
  //       this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
  //     }
  //   );
  // }

  // DELETE METHOD
  // deleteItem(id: number): void {
  //   this.httpClient.delete(this.API_URL + id).subscribe(data => {
  //     console.log(data['']);
  //       this.toasterService.showToaster('Successfully deleted', 3000);
  //     },
  //     (err: HttpErrorResponse) => {
  //       this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
  //     }
  //   );
  // }





