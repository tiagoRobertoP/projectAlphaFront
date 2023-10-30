import { Component, Inject } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pessoa',
  templateUrl: './delete-pessoa.component.html',
  styleUrls: ['./delete-pessoa.component.css']
})
export class DeletePessoaComponent   {

  constructor(public dialogRef: MatDialogRef<DeletePessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public pessoaService: PessoaService) { }

  onNoClick(): void {
  this.dialogRef.close();
  }

  confirmDelete(): void {
  this.pessoaService.deletePessoa(this.data.idPessoa).subscribe(resultado => this.data = resultado);
  }
}
