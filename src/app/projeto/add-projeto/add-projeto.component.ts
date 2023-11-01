import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Projeto } from '../projeto.model';
import { ProjetoService } from '../projeto.service';
import { Pessoa } from 'src/app/pessoa/pessoa.model';

@Component({
  selector: 'app-add-projeto',
  templateUrl: './add-projeto.component.html',
  styleUrls: ['./add-projeto.component.css']
})
export class AddProjetoComponent implements OnInit {

  public addFormGroup: FormGroup;
  gerente: Array<Pessoa> =[];
  Risco: Array<{option:string}> = [
    {option:"BAIXO_RISCO"},
    {option:"MEDIO_RISCO"},
    {option:"ALTO_RISCO"}
  ];
  Status: Array<{option:string}> = [
    {option:"EM_ANALISE"},
    {option:"ANALISE_REALIZADA"},
    {option:"AGENDADANALISE_APROVADA"},
    {option:"INICIADO"},
    {option:"PLANEJADO"},
    {option:"EM_ANDAMENTO"},
    {option:"ENCERRADO"},
    {option:"CANCELADO"}
  ];


  constructor(public dialogRef: MatDialogRef<AddProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public projetoService: ProjetoService,
    private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    this.addFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      status: ['',Validators.required],
      risco: ['', Validators.required],
      orcamento: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataPrevisaoFim: ['', Validators.required],
      dataFim: ['', Validators.required],
      gerente: ['', Validators.required]
    });
    this.addFormGroup.get('gerente').updateValueAndValidity();
    this.addFormGroup.patchValue({'gerente': this.data.pessoaList});
    this.gerente = this.data.pessoaList;
    console.log('data ' + this.data);
    console.log('gerente ' + this.gerente)

  }

  formControl = new FormControl('', [
  Validators.required
  // Validators.email,
  ]);

  getErrorMessage() {
  return this.formControl.hasError('required') ? 'Required field' :
  this.formControl.hasError('email') ? 'Not a valid email' :
  '';
  }

  submit() {

  }

  onNoClick(): void {
  this.dialogRef.close();
  }

  public confirmAdd(): void {
  this.projetoService.addProjeto(this.addFormGroup.value).subscribe(resultado => this.data = resultado);
  }

  changePessoa(value) {
    console.log(value);
}



}

// export enum Risco { BAIXO_RISCO, MEDIO_RISCO, ALTO_RISCO }
