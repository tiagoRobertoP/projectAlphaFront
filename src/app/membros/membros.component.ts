import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pessoa } from '../pessoa/pessoa.model';
import { Projeto } from '../projeto/projeto.model';
import { MembrosService } from './membros.service';
import { Membros } from './membros.model';
import { PessoaService } from '../pessoa/pessoa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesvincularMembroComponent } from './desvincular-membro/desvincular-membro.component';
import { VincularMembrosComponent } from './vincular-membros/vincular-membros.component';


@Component({
  selector: 'app-membros',
  templateUrl: './membros.component.html',
  styleUrls: ['./membros.component.css']
})
export class MembrosComponent implements OnInit {

  displayedColumns = ['idPessoa', 'nome', 'idProjeto', 'actions'];
  pessoaService2: PessoaService | null;
  dataSource = new MatTableDataSource();
  index: number;
  id: number;
  totalElements: number = 0;
  public pessoas:Array<Pessoa> = [];
  public pessoasList:Array<Pessoa> = [];
  EhMembro: Boolean =  false;
  selected: Projeto;
  projetoList: Array<Projeto> = [];
  public membros:Array<Membros> = [];
  public addFormGroup: FormGroup;
  projetoValue: number;

  constructor(public httpClient: HttpClient,
              public dialogService: MatDialog,
              public dataService: MembrosService,
              public router: Router,
              public membrosService: MembrosService,
              private changeDetectorRefs: ChangeDetectorRef,
              private formBuilder: FormBuilder) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.loadData({ page: "0", size: "1000" });
    this.addFormGroup = this.formBuilder.group({
      projeto: ['', Validators.required],
    });

    this.addFormGroup.get('projeto').updateValueAndValidity();
    this.addFormGroup.patchValue({'projeto': this.projetoList});
  }

  ngAfterViewInit() {}

  submit() {}

  // openAddDialog() {
  //   const dialogRef = this.dialogService.open(AddPessoaComponent, {
  //     data: {pessoa: {} }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       this.pessoaService.dataChange.value.push(this.dataService.getDialogData());
  //       this.refreshTable();
  //     }
  //   });
  // }

  // startEdit(i: number, idPessoa: number,nome: string, cpf: string, datanascimento: string, funcionario: string) {
  //   this.id = idPessoa;
  //   this.index = i;
  //   console.log(this.index);
  //   const dialogRef = this.dialogService.open(EditPessoaComponent, {
  //     data: {idPessoa: idPessoa, nome: nome, cpf: cpf, datanascimento: datanascimento, funcionario: funcionario}
  //   })
  //   .afterClosed()
  //   .subscribe((shouldReload: boolean) => {
  //       if (shouldReload) window.location.reload()
  //   });
  // }

  desvincular(i: number, idPessoa: number, nome: string, idProjeto: number) {
    this.index = i;
    this.id = idPessoa;
    const dialogRef = this.dialogService.open(DesvincularMembroComponent, {
      data: {idPessoa: idPessoa, nome: nome, idProjeto: idProjeto}
    })
    .afterClosed()
    .subscribe(() => {
      this.changePessoa(this.projetoValue);
      this.selected.id = this.projetoValue;
      this.selected = this.selected ;
    });
  }

  vincular(i: number, idPessoa: number, nome: string, idProjeto: number) {
    this.index = i;
    this.id = idPessoa;
    const dialogRef = this.dialogService.open(VincularMembrosComponent, {
      data: {idPessoa: idPessoa, nome: nome, idProjeto: this.projetoValue}
    });
    // .afterClosed()
    // .subscribe(() => {
    //     // this.membrosService.dataChange.value.push(this.dataService.getDialogData());
    //     window.location.reload()
    //     this.changePessoa(this.projetoValue);
    //     // this.selected.id = this.projetoValue;
    //     // this.selected = this.selected ;
    // });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.membrosService.dataChange.value.push(this.dataService.getDialogData());
        this.changePessoa(this.projetoValue);
        this.selected.id = this.projetoValue;
        this.selected = this.selected ;
      }
    });
  }


  // private refreshTable() {
  //   this.loadData({ page: "0", size: "5" });
  // }

  public loadData(request): void {
    this.pessoasList = [];
    this.membrosService.getAllProjetos(request).subscribe(resultado =>
      {
        this.projetoList = resultado['content'];
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.loadData(request);
  }

  changePessoa(value) {
    this.projetoValue = value;
    this.pessoasList = [];
    this.membrosService.getAllPessoas({ page: "0", size: "10" }).subscribe(resultado =>
      {
        this.pessoas = resultado['content'];
        console.log (resultado)

        this.totalElements = resultado['totalElements']
        // this.dataSource.data = this.pessoasList

        this.membrosService.getAllMembrosByProjeto({ page: "0", size: "10" }, value).subscribe(resultado =>
          {
            this.membros = resultado;

            for (let pessoa of this.pessoas)  {
              for ( let membro of this.membros){
                if( membro.membrosId.pessoa.idPessoa === pessoa.idPessoa ){
                  pessoa.EhMembro = true;
                  pessoa.idProjeto = membro.membrosId.idprojeto;
                }
              }

              if(pessoa.funcionario ) {
                this.pessoasList.push(pessoa)
              }
            }
            this.dataSource.data = this.pessoasList;
            this.totalElements = this.pessoasList.length
            console.log(this.dataSource);
          });



      });
  }

}
