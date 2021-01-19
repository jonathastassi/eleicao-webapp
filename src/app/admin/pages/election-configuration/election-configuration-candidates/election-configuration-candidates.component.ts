import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { Candidate } from './../../../../shared/models/candidate';
import Swal from 'sweetalert2';
import { Election } from 'src/app/shared/models/election';
import { ElectionService } from 'src/app/shared/services/election.service';
import { EStateElection } from 'src/app/shared/enums/e-state-election.enum';
import { SectionService } from './../../../../shared/services/section.service';

@Component({
  selector: 'app-election-configuration-candidates',
  templateUrl: './election-configuration-candidates.component.html',
  styleUrls: ['./election-configuration-candidates.component.css']
})
export class ElectionConfigurationCandidatesComponent implements OnInit, OnDestroy {

  updateMode = false;
  private electionId: string;
  form: FormGroup;
  public stateElection = EStateElection;

  items$: Observable<Candidate[]>;
  election$: Observable<Election>;

  hasSessionOpenedOrFinalized = false;
  sectionSubscription: Subscription;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public candidateService: CandidateService,
    public electionService: ElectionService,
    public sectionService: SectionService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.min(1)]]
    });
   }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.electionId = paramMap.get('electionId');
      this.items$ = this.candidateService.getCandidatesByElectionId(this.electionId);
      this.election$ = this.electionService.getElectionById(this.electionId);

      this.sectionSubscription = this.sectionService.hasSessionOpenedOrFinalized(this.electionId).subscribe(x => this.hasSessionOpenedOrFinalized = x);
    });
  }

  edit(model: Candidate) {
    this.form.patchValue(model);
    this.updateMode = true;
  }

  remove(model: Candidate) {
    Swal.fire({
      title: 'Deseja remover o candidato?',
      text: "Esse processo não poderá ser desfeito!",
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      reverseButtons: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      customClass: {
        confirmButton: 'btn btn-outline-info w-25 ml-1',
        cancelButton: 'btn btn-outline-danger w-25 mr-1'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidateService.delete(model, this.electionId)
          .then(
            () => {
              this.toastr.success('Candidato removido com sucesso.', 'Sucesso!');
            },
            (err) => {
              this.toastr.error('Não foi possível remover.', 'Erro!');
            }
            );
      }
    })
  }

  cancelEdit() {
    this.updateMode = false;
    this.form.reset();
  }

  save(candidates: Candidate[]) {

    const candidatesWithSameCode = candidates.filter(x => x.code == this.form.get('code').value && x.code != this.form.get('id').value);

    if (candidatesWithSameCode.length > 0 && candidatesWithSameCode[0]?.id != this.form.get('id').value) {
      this.toastr.warning('Número já usado em outro candidato.', 'Atenção!');
      return;
    }

    if (this.updateMode) {
      this.candidateService.update(this.form.getRawValue(), this.electionId).then(
        () => {
          this.toastr.success('Candidato alterado com sucesso.', 'Sucesso!');
          this.form.reset();
          this.updateMode = false;
        },
        (err) => {
          this.toastr.error('Não foi possível alterar.', 'Erro!');
        }
        );
    }
    else {
      this.candidateService.insert(this.form.getRawValue(), this.electionId).then(
        () => {
          this.toastr.success('Candidato adicionado com sucesso.', 'Sucesso!');
          this.form.reset();
        },
        (err) => {
          this.toastr.error('Não foi possível adicionar.', 'Erro!');
        }
        );
    }
  }

}
