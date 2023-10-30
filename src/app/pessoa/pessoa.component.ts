import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';


// import {AddDialogComponent} from './dialogs/add/add.dialog.component';
// import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
// import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';

import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit, AfterViewInit  {


  displayedColumns = ['idPessoa', 'nome', 'cpf', 'datanascimento', 'funcionario', 'actions'];
  pessoaService2: PessoaService | null;
  dataSource = new MatTableDataSource();
  index: number;
  id: number;
  totalElements: number = 0;
  public pessoas:Array<Pessoa> = [];

  constructor(public httpClient: HttpClient,
              public dialogService: MatDialog,
              public dataService: PessoaService,
              public router: Router,
              public pessoaService: PessoaService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.loadData({ page: "0", size: "5" });
  }

  // reload() {
  //   this.loadData({ page: "0", size: "5" });
  // }

  ngAfterViewInit() {

  }



  // openAddDialog() {
  //   const dialogRef = this.dialogService.open(AddDialogComponent, {
  //     data: {issue: {} }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       // After dialog is closed we're doing frontend updates
  //       // For add we're just pushing a new row inside DataService
  //       this.pessoaService.dataChange.value.push(this.dataService.getDialogData());
  //       this.refreshTable();
  //     }
  //   });
  // }

  // startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
  //   this.id = id;
  //   // index row is used just for debugging proposes and can be removed
  //   this.index = i;
  //   console.log(this.index);
  //   const dialogRef = this.dialogService.open(EditDialogComponent, {
  //     data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       // When using an edit things are little different, firstly we find record inside DataService by id
  //       const foundIndex = this.pessoaService.dataChange.value.findIndex(x => x.id === this.id);
  //       // Then you update that record using data from dialogData (values you enetered)
  //       this.pessoaService.dataChange.value[foundIndex] = this.dataService.getDialogData();
  //       // And lastly refresh table
  //       this.refreshTable();
  //     }
  //   });
  // }

  // deleteItem(i: number, id: number, title: string, state: string, url: string) {
  //   this.index = i;
  //   this.id = id;
  //   const dialogRef = this.dialogService.open(DeleteDialogComponent, {
  //     data: {id: id, title: title, state: state, url: url}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       const foundIndex = this.pessoaService.dataChange.value.findIndex(x => x.id === this.id);
  //       // for delete we use splice in order to remove single object from DataService
  //       this.pessoaService.dataChange.value.splice(foundIndex, 1);
  //       this.refreshTable();
  //     }
  //   });
  // }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData(request): void {
    this.pessoaService.getAllPessoas(request).subscribe(resultado =>
      {
        this.pessoas = resultado['content'];
        this.totalElements = resultado['totalElements']
        this.dataSource = resultado['content']
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.loadData(request);
  }


}































