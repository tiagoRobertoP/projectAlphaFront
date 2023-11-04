import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddPessoaComponent } from './add-pessoa/add-pessoa.component';
import { DeletePessoaComponent } from './delete-pessoa/delete-pessoa.component';
import { EditPessoaComponent } from './edit-pessoa/edit-pessoa.component';
import { ProjectsModalComponent } from './projects-modal/projects-modal.component';


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
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ProjectsModalComponent, any> | undefined;

  constructor(public httpClient: HttpClient,
              public dialogService: MatDialog,
              public dataService: PessoaService,
              public router: Router,
              public pessoaService: PessoaService,
              private changeDetectorRefs: ChangeDetectorRef,
              public matDialog: MatDialog) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.loadData({ page: "0", size: "5" });
  }

  ngAfterViewInit() {}

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddPessoaComponent, {
      data: {pessoa: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.pessoaService.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, idPessoa: number,nome: string, cpf: string, datanascimento: string, funcionario: string) {
    this.id = idPessoa;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialogService.open(EditPessoaComponent, {
      data: {idPessoa: idPessoa, nome: nome, cpf: cpf, datanascimento: datanascimento, funcionario: funcionario}
    })
    .afterClosed()
    .subscribe((shouldReload: boolean) => {
        if (shouldReload) window.location.reload()
    });
  }

  deleteItem(i: number, idPessoa: number, nome: string, cpf: string, datanascimento: string) {
    this.index = i;
    this.id = idPessoa;
    const dialogRef = this.dialogService.open(DeletePessoaComponent, {
      data: {idPessoa: idPessoa, nome: nome, cpf: cpf, datanascimento: datanascimento}
    })
    ;
    // .afterClosed()
    // .subscribe((shouldReload: boolean) => {
    //     if (shouldReload) window.location.reload()
    // });

    dialogRef.afterClosed().subscribe(
      result => {
        if (this.pessoaService.resultFromDelete === 1) {
        // window.location.reload()
        // this.refreshTable();
        console.log(result);
        }
      });
  }

  openModal() {
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "250px";
    this.dialogConfig.width = "500px";
    this.modalDialog = this.matDialog.open(ProjectsModalComponent, this.dialogConfig);
  }


  private refreshTable() {
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




