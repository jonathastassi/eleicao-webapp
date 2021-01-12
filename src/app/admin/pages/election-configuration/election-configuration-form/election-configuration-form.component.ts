import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElectionService } from 'src/app/shared/services/election.service';

@Component({
  selector: 'app-election-configuration-form',
  templateUrl: './election-configuration-form.component.html',
  styleUrls: ['./election-configuration-form.component.css'],
})
export class ElectionConfigurationFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    public electionService: ElectionService,
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      date: [null, [Validators.required]],
      concluded: [false],
    });
  }

  ngOnInit(): void {}

  save() {
    this.electionService.insert(this.form.getRawValue()).then(
      () => {
        this.toastr.success('Registro salvo com sucesso.', 'Sucesso!');
        this.router.navigateByUrl('/admin/election-configuration/list');
      },
      (err) => {
        this.toastr.success('Não foi possível salvar.', 'Erro!');
      }
    );
  }
}
