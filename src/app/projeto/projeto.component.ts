import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ProjetoService } from './projeto.service';
import { MatTableDataSource } from '@angular/material/table';
import { Projeto } from './projeto.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddProjetoComponent } from './add-projeto/add-projeto.component';
import { Pessoa } from '../pessoa/pessoa.model';
import { EditProjetoComponent } from './edit-projeto/edit-projeto.component';
import { DeleteProjetoComponent } from './delete-projeto/delete-projeto.component';
import { ProjectsModalComponent } from '../pessoa/projects-modal/projects-modal.component';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  displayedColumns = ['id', 'nome', 'descricao', 'status', 'risco','orcamento', 'dataInicio', 'dataPrevisaoFim', 'dataFim', 'nomeGerente', 'gerente', 'actions'];
  projetoService2: ProjetoService | null;
  dataSource = new MatTableDataSource();
  index: number;
  id: number;
  totalElements: number = 0;
  public projetos:Array<Projeto> = [];
  public projetosList:Array<Projeto> = [];
  pessoaList: Array<Pessoa> = [];
  pessoaList2: Array<Pessoa> = [];
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ProjectsModalComponent, any> | undefined;

  constructor(public httpClient: HttpClient,
              public dialogService: MatDialog,
              public dataService: ProjetoService,
              public router: Router,
              public projetoService: ProjetoService,
              private changeDetectorRefs: ChangeDetectorRef,
              public matDialog: MatDialog) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.loadData({ page: "0", size: "5" });
  }

  ngAfterViewInit() {}

  openAddDialog() {
    this.projetoService.getAllPessoas({ page: "0", size: "1000" }).subscribe(
      resultado => {
        this.pessoaList = resultado['content'];
        console.log(this.pessoaList);
        for(let pessoa of this.pessoaList){
          if( pessoa.funcionario ){
            this.pessoaList2.push(pessoa);
          }
        }

        const dialogRef = this.dialogService.open(AddProjetoComponent, {
          data: {projeto: {}, pessoaList: this.pessoaList2}
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

  startEdit(i: number, id: number,nome: string, descricao: string, status: string,
    risco: string, orcamento: number,dataInicio: Date, dataPrevisaoFim: Date, dataFim: Date, gerente: Pessoa) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialogService.open(EditProjetoComponent, {
      data: {id: id, nome: nome, descricao: descricao, status: status, risco: risco, orcamento: orcamento,
        dataInicio: dataInicio, dataPrevisaoFim: dataPrevisaoFim, dataFim: dataFim, gerente: gerente}
    })
    .afterClosed()
    .subscribe((shouldReload: boolean) => {
        if (shouldReload) window.location.reload()
    });
  }

  deleteItem(i: number,id: number, nome: string,) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialogService.open(DeleteProjetoComponent, {
      data: {id: id, nome: nome}
    });
    // .afterClosed()
    // .subscribe((shouldReload: boolean) => {
    //     if (shouldReload) window.location.reload();
    // });
    dialogRef.afterClosed().subscribe(
      result => {
          this.refreshTable();
          window.location.reload()
        }
    );
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

