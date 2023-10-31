import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PessoaService } from '../pessoa.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.css']
})
export class EditPessoaComponent implements OnInit {

  public addFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pessoaService: PessoaService,
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
    idPessoa: ['', Validators.required],
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    datanascimento: ['',Validators.required],
    funcionario: ['', Validators.required],
  });

  this.addFormGroup.get('idPessoa').updateValueAndValidity();
  this.addFormGroup.patchValue({'idPessoa': this.data.idPessoa});
  this.addFormGroup.get('nome').updateValueAndValidity();
  this.addFormGroup.patchValue({'nome': this.data.nome});
  this.addFormGroup.get('cpf').updateValueAndValidity();
  this.addFormGroup.patchValue({'cpf': this.data.cpf});
  this.addFormGroup.get('datanascimento').updateValueAndValidity();
  this.addFormGroup.patchValue({'datanascimento': this.data.datanascimento});
  this.addFormGroup.get('funcionario').updateValueAndValidity();
  this.addFormGroup.patchValue({'funcionario': String(this.data.funcionario)});
}

onNoClick(): void {
this.dialogRef.close();
}

stopEdit(): void {
this.pessoaService.updatePessoa(this.addFormGroup.value).subscribe(resultado => this.data = resultado);
}
}
