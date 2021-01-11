import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() public user: firebase.User;

  public isMenuCollapsed = true;

  constructor(public auth: AngularFireAuth, public router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl('admin/login');
  }

  logout() {
    this.router.navigateByUrl('p/initial');
    this.auth.signOut();
  }
}