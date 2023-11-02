import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ProjetoService } from '../projeto.service';
import { Pessoa } from 'src/app/pessoa/pessoa.model';

@Component({
  selector: 'app-edit-projeto',
  templateUrl: './edit-projeto.component.html',
  styleUrls: ['./edit-projeto.component.css']
})
export class EditProjetoComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<EditProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public projetoService: ProjetoService,
    private formBuilder: FormBuilder) { }

formControl = new FormControl('', [
Validators.required
]);

// getErrorMessage() {
// return this.formControl.hasError('required') ? 'Required field' :
// this.formControl.hasError('email') ? 'Not a valid email' :
// '';
// }

submit() {}

ngOnInit(): void {
  this.addFormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    status: ['',Validators.required],
    risco: ['',Validators.required],
    orcamento: ['', Validators.required],
    dataInicio: ['', Validators.required],
    dataProvisaoFim: ['', Validators.required],
    dataFim: ['', Validators.required],
    gerente: ['', Validators.required],
  });

  this.addFormGroup.get('id').updateValueAndValidity();
  this.addFormGroup.patchValue({'id': this.data.idPessoa});
  this.addFormGroup.get('nome').updateValueAndValidity();
  this.addFormGroup.patchValue({'nome': this.data.nome});
  this.addFormGroup.get('descricao').updateValueAndValidity();
  this.addFormGroup.patchValue({'descricao': this.data.cpf});
  this.addFormGroup.get('status').updateValueAndValidity();
  this.addFormGroup.patchValue({'status': this.data.datanascimento});
  this.addFormGroup.get('risco').updateValueAndValidity();
  this.addFormGroup.patchValue({'risco': String(this.data.funcionario)});
  this.addFormGroup.get('orcamento').updateValueAndValidity();
  this.addFormGroup.patchValue({'orcamento': String(this.data.funcionario)});
  this.addFormGroup.get('dataInicio').updateValueAndValidity();
  this.addFormGroup.patchValue({'dataInicio': String(this.data.funcionario)});
  this.addFormGroup.get('dataProvisaoFim').updateValueAndValidity();
  this.addFormGroup.patchValue({'dataProvisaoFim': String(this.data.funcionario)});
  this.addFormGroup.get('dataFim').updateValueAndValidity();
  this.addFormGroup.patchValue({'dataFim': String(this.data.funcionario)});
  this.addFormGroup.get('gerente').updateValueAndValidity();
  this.addFormGroup.patchValue({'gerente': String(this.data.funcionario)});
}

onNoClick(): void {
this.dialogRef.close();
}

stopEdit(): void {
this.projetoService.updateProjeto(this.addFormGroup.value).subscribe(resultado => this.data = resultado);
}
}
