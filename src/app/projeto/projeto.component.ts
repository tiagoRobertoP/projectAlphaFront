import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ProjetoService } from './projeto.service';
import { MatTableDataSource } from '@angular/material/table';
import { Projeto } from './projeto.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddProjetoComponent } from './add-projeto/add-projeto.component';
import { Pessoa } from '../pessoa/pessoa.model';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  displayedColumns = ['id', 'nome', 'descricao', 'status', 'risco','orcamento', 'dataInicio', 'dataPrevisaoFim', 'dataFim', 'nomeGerente', 'actions'];
  projetoService2: ProjetoService | null;
  dataSource = new MatTableDataSource();
  index: number;
  id: number;
  totalElements: number = 0;
  public projetos:Array<Projeto> = [];
  public projetosList:Array<Projeto> = [];
  pessoaList: Array<Pessoa> = [];

  constructor(public httpClient: HttpClient,
              public dialogService: MatDialog,
              public dataService: ProjetoService,
              public router: Router,
              public projetoService: ProjetoService,
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
    this.projetoService.getAllPessoas({ page: "0", size: "1000" }).subscribe(
      resultado => {
        this.pessoaList = resultado['content'];
        console.log(this.pessoaList);

        const dialogRef = this.dialogService.open(AddProjetoComponent, {
          data: {projeto: {}, pessoaList: this.pessoaList}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {
            // After dialog is closed we're doing frontend updates
            // For add we're just pushing a new row inside DataService
            this.projetoService.dataChange.value.push(this.dataService.getDialogData());
            this.refreshTable();
          }
        });

    });


  }

  // startEdit(i: number, idPessoa: number,nome: string, cpf: string, datanascimento: string, funcionario: string) {
  //   this.id = idPessoa;
  //   // index row is used just for debugging proposes and can be removed
  //   this.index = i;
  //   console.log(this.index);
  //   const dialogRef = this.dialogService.open(EditPessoaComponent, {
  //     data: {idPessoa: idPessoa, nome: nome, cpf: cpf, datanascimento: datanascimento, funcionario: funcionario}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // if (result === 1) {

  //       // const foundIndex = this.projetoService.dataChange.value.findIndex(x => x.idPessoa === this.id);

  //       // this.projetoService.dataChange.value[foundIndex] = this.dataService.getDialogData();
  //       // And lastly refresh table
  //       this.refreshTable();
  //     // }
  //   });
  // }

  // deleteItem(i: number, idPessoa: number, nome: string, cpf: string, datanascimento: string) {
  //   this.index = i;
  //   this.id = idPessoa;
  //   const dialogRef = this.dialogService.open(DeletePessoaComponent, {
  //     data: {idPessoa: idPessoa, nome: nome, cpf: cpf, datanascimento: datanascimento}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //       const foundIndex = this.projetoService.dataChange.value.findIndex(x => x.idPessoa === this.id);

  //       this.projetoService.dataChange.value.splice(foundIndex, 1);
  //       this.projetoService.dataChange.value.push(this.dataService.getDialogData());
  //       this.refreshTable();
  //   });
  // }


  private refreshTable() {
    // this.paginator._changePageSize(this.paginator.pageSize);
    this.loadData({ page: "0", size: "5" });


  }

  public loadData(request): void {
    this.projetosList = [];
    this.projetoService.getAllProjetos(request).subscribe(resultado =>
      {
        this.projetos = resultado['content'];
        for (let projeto of this.projetos){
          if (projeto.gerente !== null){
            projeto.nomeGerente =  projeto.gerente.nome;
          }
          this.projetosList.push(projeto);
        }

        this.totalElements = resultado['totalElements']
        this.dataSource.data = this.projetosList;
        // this.dataSource.data = resultado['content'];
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.loadData(request);
  }


}

