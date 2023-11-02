import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjetoService } from '../projeto.service';

@Component({
  selector: 'app-delete-projeto',
  templateUrl: './delete-projeto.component.html',
  styleUrls: ['./delete-projeto.component.css']
})
export class DeleteProjetoComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public projetoService: ProjetoService) { }

  onNoClick(): void {
  this.dialogRef.close();
  }

  confirmDelete(): void {
  this.projetoService.deleteProjeto(this.data.id).subscribe(resultado => this.data = resultado);
  }
}
