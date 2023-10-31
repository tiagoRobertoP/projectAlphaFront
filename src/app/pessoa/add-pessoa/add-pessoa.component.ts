import { Component, Inject, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PessoaService } from '../pessoa.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css']
})
export class AddPessoaComponent implements OnInit {

  public addFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa,
    public pessoaService: PessoaService,
    private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    this.addFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      datanascimento: ['',Validators.required],
      funcionario: ['', Validators.required],
    });
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
  this.pessoaService.addPessoa(this.addFormGroup.value).subscribe(resultado => this.data = resultado);
  }

}
