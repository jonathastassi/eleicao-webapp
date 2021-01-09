import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    public auth: AngularFireAuth,
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.form.markAllAsTouched();
  }

  login() {
    this.auth
      .signInWithEmailAndPassword(
        this.form.get('email').value,
        this.form.get('password').value
      )
      .then(() => {
        this.toastr.success('Entrada validada com sucesso.', 'Sucesso!');
        this.router.navigateByUrl('admin/election-configuration');
      })
      .catch((e) => {
        this.toastr.error(
          'E-mail ou senha incorretos.',
          'Não foi possível entrar!'
        );
      });
  }
}
