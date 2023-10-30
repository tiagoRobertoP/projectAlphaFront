import { Component, Inject } from '@angular/core';
import { Pessoa } from '../pessoa.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PessoaService } from '../pessoa.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css']
})
export class AddPessoaComponent {

  constructor(public dialogRef: MatDialogRef<AddPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa,
    public pessoaService: PessoaService) { }

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
  // emppty stuff
  }

  onNoClick(): void {
  this.dialogRef.close();
  }

  public confirmAdd(): void {
  this.pessoaService.addPessoa(this.data).subscribe(resultado => this.data = resultado);
  }

  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
}
