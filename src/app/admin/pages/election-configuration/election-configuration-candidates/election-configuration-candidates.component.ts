import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { Candidate } from './../../../../shared/models/candidate';

@Component({
  selector: 'app-election-configuration-candidates',
  templateUrl: './election-configuration-candidates.component.html',
  styleUrls: ['./election-configuration-candidates.component.css']
})
export class ElectionConfigurationCandidatesComponent implements OnInit {

  private electionId: string;
  form: FormGroup;

  items$: Observable<Candidate[]>;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public candidateService: CandidateService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.electionId = paramMap.get('electionId');
      this.items$ = this.candidateService.getCandidatesByElectionId(this.electionId);
    });
  }

  save() {
    this.candidateService.insert(this.form.getRawValue(), this.electionId).then(
      () => {
        this.toastr.success('Candidato adicionado com sucesso.', 'Sucesso!');
        this.form.reset();
      },
      (err) => {
        this.toastr.success('Não foi possível adicionar.', 'Erro!');
      }
    );
  }

}
