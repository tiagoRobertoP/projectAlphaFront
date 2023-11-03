import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembrosService } from '../membros.service';
import { MembrosId } from '../membros-id.model';
import { Pessoa } from 'src/app/pessoa/pessoa.model';


@Component({
  selector: 'app-desvincular-membro',
  templateUrl: './desvincular-membro.component.html',
  styleUrls: ['./desvincular-membro.component.css']
})
export class DesvincularMembroComponent  {
  membrosId: MembrosId = new MembrosId();
  pessoa: Pessoa = new Pessoa();

  constructor(public dialogRef: MatDialogRef<DesvincularMembroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public membrosService: MembrosService) { }

  onNoClick(): void {
  this.dialogRef.close();
  }




  confirmDesvincular(): void {
    this.membrosId.pessoa = this.pessoa;
    this.membrosId.idprojeto = this.data.idProjeto;
    this.membrosId.pessoa.idPessoa = this.data.idPessoa;
    this.membrosService.desvincular(this.membrosId).subscribe(resultado => this.data = resultado);
  }
}
