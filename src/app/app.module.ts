import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { NavComponent } from './nav/nav.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './layout/layout.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MatToolbarModule } from '@angular/material/toolbar' ;
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Sort, MatSortModule } from '@angular/material/sort';
import { AddPessoaComponent } from './pessoa/add-pessoa/add-pessoa.component';
import { FormsModule } from '@angular/forms';
import { DeletePessoaComponent } from './pessoa/delete-pessoa/delete-pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { EditPessoaComponent } from './pessoa/edit-pessoa/edit-pessoa.component';


@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    NavComponent,
    LayoutComponent,
    CabecalhoComponent,
    AddPessoaComponent,
    DeletePessoaComponent,
    EditPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
