import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EStateSection } from 'src/app/shared/enums/e-state-section.enum';
import { SectionService } from './../../../../../shared/services/section.service';
import { Section } from 'src/app/shared/models/section';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Election } from 'src/app/shared/models/election';
import { EStateElection } from 'src/app/shared/enums/e-state-election.enum';
import { ElectionService } from 'src/app/shared/services/election.service';

@Component({
  selector: 'app-election-configuration-sections-form',
  templateUrl: './election-configuration-sections-form.component.html',
  styleUrls: ['./election-configuration-sections-form.component.css'],
})
export class ElectionConfigurationSectionsFormComponent implements OnInit, OnDestroy {
  public electionId: string;
  public sectionId: string;

  public stateSection = EStateSection;

  form: FormGroup;

  electionSubscription: Subscription;
  election: Election;
  public stateElection = EStateElection;

  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public sectionService: SectionService,
    public electionService: ElectionService,
  ) {
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      state: [EStateSection.Pending, [Validators.required]],
      sequence: [1, [Validators.required]],
      peopleToVote: [null, [Validators.required, Validators.min(1)]],
      candidatesExcluded: [[]],
      dateInitial: [null],
      dateFinal: [null],
    });
  }
  ngOnDestroy(): void {
    this.electionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.electionId = paramMap.get('electionId');
      this.sectionId = paramMap.get('sectionId');

      if (this.sectionId) {
        const model: Section = Object.assign({}, this.route.snapshot.data.model);
        this.form.patchValue({ ...model });

        if (model.state != EStateSection.Pending) {
          setTimeout(() => {
            this.form.controls['title'].disable();
            this.form.controls['peopleToVote'].disable();
          }, 500);
        }
      }

      this.electionSubscription = this.electionService.getElectionById(this.electionId).subscribe(
        x => {
          this.election = x;

          if (this.election.state == EStateElection.Finalized) {
            setTimeout(() => {
              this.form.controls['title'].disable();
              this.form.controls['peopleToVote'].disable();
            }, 500);
          }
        }
      );
    });
  }

  save() {
    if (this.sectionId) {
      this.sectionService.update(this.form.getRawValue(), this.electionId).then(
        () => {
          this.toastr.success('Sessão alterada com sucesso.', 'Sucesso!');
          this.router.navigateByUrl(
            `/admin/election-configuration/${this.electionId}/sections/list`
          );
        },
        (err) => {
          this.toastr.error('Não foi possível alterar a sessão.', 'Erro!');
        }
      );
    } else {
      this.sectionService.insert(this.form.getRawValue(), this.electionId).then(
        () => {
          this.toastr.success('Sessão criada com sucesso.', 'Sucesso!');
          this.router.navigateByUrl(
            `/admin/election-configuration/${this.electionId}/sections/list`
          );
        },
        (err) => {
          this.toastr.error('Não foi possível criar a sessão.', 'Erro!');
        }
      );
    }
  }

  remove() {
    if (this.form.get('state').value == EStateSection.Pending) {
      Swal.fire({
        title: 'Deseja remover a sessão?',
        text: 'Esse processo não poderá ser desfeito!',
        icon: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        reverseButtons: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        customClass: {
          confirmButton: 'btn btn-outline-info w-25 ml-1',
          cancelButton: 'btn btn-outline-danger w-25 mr-1',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.sectionService.delete(this.sectionId, this.electionId).then(
            () => {
              this.toastr.success('Sessão removida com sucesso.', 'Sucesso!');
              this.router.navigateByUrl(
                `/admin/election-configuration/${this.electionId}/sections/list`
              );
            },
            (err) => {
              this.toastr.error('Não foi possível remover.', 'Erro!');
            }
          );
        }
      });
    }
  }
}
