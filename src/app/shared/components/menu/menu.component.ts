import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() public user: any;

  public isMenuCollapsed = true;

  constructor(public auth: AngularFireAuth, public router: Router) {}

  ngOnInit(): void {}

  login() {
    this.isMenuCollapsed = true;
    this.router.navigateByUrl('admin/login');
  }

  logout() {
    this.isMenuCollapsed = true;
    this.router.navigateByUrl('p/initial');
    this.auth.signOut();
  }
}
