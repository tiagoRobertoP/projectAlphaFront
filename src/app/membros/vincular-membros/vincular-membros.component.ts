import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembrosService } from '../membros.service';
import { MembrosId } from '../membros-id.model';
import { Pessoa } from 'src/app/pessoa/pessoa.model';

@Component({
  selector: 'app-vincular-membros',
  templateUrl: './vincular-membros.component.html',
  styleUrls: ['./vincular-membros.component.css']
})
export class VincularMembrosComponent{

  membrosId: MembrosId = new MembrosId();
  pessoa: Pessoa = new Pessoa();

  constructor(public dialogRef: MatDialogRef<VincularMembrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public membrosService: MembrosService) { }

  onNoClick(): void {
  this.dialogRef.close();
  }

  confirmVincular(): void {
    this.membrosId.pessoa = this.pessoa;
    this.membrosId.idprojeto = this.data.idProjeto;
    this.membrosId.pessoa.idPessoa = this.data.idPessoa;
    this.membrosService.vincular(this.membrosId).subscribe(resultado => {
      this.data = resultado;
    });
  }
}
