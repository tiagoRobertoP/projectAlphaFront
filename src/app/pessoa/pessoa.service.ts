import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Pessoa } from './pessoa.model';
import { Router } from '@angular/router';






@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly API_URL = 'http://localhost:8080/api';

  dataChange: BehaviorSubject<Pessoa[]> = new BehaviorSubject<Pessoa[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

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
  // addIssue(issue: Pessoa): void {
  //   this.dialogData = issue;
  // }

  // updateIssue(issue: Pessoa): void {
  //   this.dialogData = issue;
  // }

  // deleteIssue(id: number): void {
  //   console.log(id);
  // }
}



/* REAL LIFE CRUD Methods I've used in projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
