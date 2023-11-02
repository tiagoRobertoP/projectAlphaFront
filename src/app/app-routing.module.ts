import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { MembrosComponent } from './membros/membros.component';

const routes: Routes = [

  {path: '', component: LayoutComponent, children: [
    {path: 'pessoa', component: PessoaComponent},
    {path: 'projeto', component: ProjetoComponent},
    {path: 'membros', component: MembrosComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
