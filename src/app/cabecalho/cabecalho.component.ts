import { Component, OnInit } from '@angular/core';
import { SidenavServiceService } from '../nav/sidenav-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  constructor(private sidenav: SidenavServiceService, public router: Router) { }

  toggleRightSidenav() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
  }




}
