import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

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
import { AddPessoaComponent } from './add-pessoa/add-pessoa.component';
import { DeletePessoaComponent } from './delete-pessoa/delete-pessoa.component';
import { EditPessoaComponent } from './edit-pessoa/edit-pessoa.component';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit, AfterViewInit  {


  displayedColumns = ['idPessoa', 'nome', 'cpf', 'datanascimento', 'Efuncionario','funcionario', 'actions'];
  pessoaService2: PessoaService | null;
  dataSource = new MatTableDataSource();
  index: number;
  id: number;
  totalElements: number = 0;
  public pessoas:Array<Pessoa> = [];
  public pessoasList:Array<Pessoa> = [];

  constructor(public httpClient: HttpClient,
              public dialogService: MatDialog,
              public dataService: PessoaService,
              public router: Router,
              public pessoaService: PessoaService,
              private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.loadData({ page: "0", size: "5" });
  }

  // reload() {
  //   this.loadData({ page: "0", size: "5" });
  // }

  ngAfterViewInit() {}

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddPessoaComponent, {
      data: {pessoa: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.pessoaService.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, idPessoa: number,nome: string, cpf: string, datanascimento: string, funcionario: string) {
    this.id = idPessoa;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialogService.open(EditPessoaComponent, {
      data: {idPessoa: idPessoa, nome: nome, cpf: cpf, datanascimento: datanascimento, funcionario: funcionario}
    })
    .afterClosed()
    .subscribe((shouldReload: boolean) => {
        if (shouldReload) window.location.reload()
    });

    // dialogRef.afterClosed().subscribe(result => {
      // if (result === 1) {

        // const foundIndex = this.pessoaService.dataChange.value.findIndex(x => x.idPessoa === this.id);

        // this.pessoaService.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      // }
    // });
  }

  deleteItem(i: number, idPessoa: number, nome: string, cpf: string, datanascimento: string) {
    this.index = i;
    this.id = idPessoa;
    const dialogRef = this.dialogService.open(DeletePessoaComponent, {
      data: {idPessoa: idPessoa, nome: nome, cpf: cpf, datanascimento: datanascimento}
    })
    .afterClosed()
    .subscribe((shouldReload: boolean) => {
        if (shouldReload) window.location.reload()
    });


    // dialogRef.afterClosed().subscribe(result => {
    //   this.pessoaService.dataChange.value.push(this.dataService.getDialogData());
    //   this.refreshTable();
    // });
  }


  private refreshTable() {
    // this.paginator._changePageSize(this.paginator.pageSize);
    this.loadData({ page: "0", size: "5" });


  }

  public loadData(request): void {
    this.pessoasList = [];
    this.pessoaService.getAllPessoas(request).subscribe(resultado =>
      {
        this.pessoas = resultado['content'];
        for (let pessoa of this.pessoas){
          if (pessoa.funcionario === true){
            pessoa.Efuncionario = 'Sim';
            this.pessoasList.push(pessoa);
          }else {
            pessoa.Efuncionario = 'Não';
            this.pessoasList.push(pessoa);
          }
        }

        this.totalElements = resultado['totalElements']
        this.dataSource.data = this.pessoasList
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.loadData(request);
  }

}
