import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavServiceService } from './sidenav-service.service';
import { MatSidenav } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavServiceService, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit(): void {

  }




}
