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
  gerente: Pessoa;
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

  pessoaList: Array<Pessoa> = [];

  selected: Pessoa;

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
    dataPrevisaoFim: ['', Validators.required],
    dataFim: ['', Validators.required],
    gerente: ['', Validators.required],
  });

  this.addFormGroup.get('id').updateValueAndValidity();
  this.addFormGroup.patchValue({'id': this.data.id});
  this.addFormGroup.get('nome').updateValueAndValidity();
  this.addFormGroup.patchValue({'nome': this.data.nome});
  this.addFormGroup.get('descricao').updateValueAndValidity();
  this.addFormGroup.patchValue({'descricao': this.data.descricao});
  this.addFormGroup.get('status').updateValueAndValidity();
  this.addFormGroup.patchValue({'status': this.data.status});
  this.addFormGroup.get('risco').updateValueAndValidity();
  this.addFormGroup.patchValue({'risco': this.data.risco});
  this.addFormGroup.get('orcamento').updateValueAndValidity();
  this.addFormGroup.patchValue({'orcamento': this.data.orcamento});
  this.addFormGroup.get('dataInicio').updateValueAndValidity();
  this.addFormGroup.patchValue({'dataInicio': this.data.dataInicio});
  this.addFormGroup.get('dataPrevisaoFim').updateValueAndValidity();
  this.addFormGroup.patchValue({'dataPrevisaoFim': this.data.dataPrevisaoFim});
  this.addFormGroup.get('dataFim').updateValueAndValidity();
  this.addFormGroup.patchValue({'dataFim': this.data.dataFim});

  this.projetoService.getAllPessoas({ page: "0", size: "1000" }).subscribe(
    resultado => {
      this.pessoaList = resultado['content'];
      console.log(this.pessoaList);

  });

  this.selected = this.data.gerente.idPessoa;

  this.addFormGroup.get('gerente').updateValueAndValidity();
  this.addFormGroup.patchValue({'gerente': this.data.gerente});
  this.addFormGroup.get('gerente').setValue(this.data.gerente.idPessoa);

  // this.addFormGroup.controls['id'].disable();
}

onNoClick(): void {
this.dialogRef.close();
}

stopEdit(): void {
  this.projetoService.updateProjeto(this.addFormGroup.value).subscribe(resultado => this.data = resultado);
}

changePessoa(value) {
  console.log(value);
}

}
