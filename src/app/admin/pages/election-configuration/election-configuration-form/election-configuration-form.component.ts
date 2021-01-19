import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EStateElection } from 'src/app/shared/enums/e-state-election.enum';
import { ElectionService } from 'src/app/shared/services/election.service';
import { Election } from 'src/app/shared/models/election';
import Swal from 'sweetalert2';
import { SectionService } from './../../../../shared/services/section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-election-configuration-form',
  templateUrl: './election-configuration-form.component.html',
  styleUrls: ['./election-configuration-form.component.css'],
})
export class ElectionConfigurationFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  public electionId: string;
  public stateElection = EStateElection;

  hasSessionOpenedOrFinalized = false;
  sectionSubscription: Subscription;

  constructor(
    public electionService: ElectionService,
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    public sectionService: SectionService
  ) {
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      date: [null, [Validators.required]],
      reference: [''],
      state: [null],
    });
  }

  ngOnDestroy(): void {
    if (this.sectionSubscription) {
      this.sectionSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.electionId = paramMap.get('electionId');

      if (this.electionId) {
        this.sectionSubscription = this.sectionService.hasSessionOpenedOrFinalized(this.electionId).subscribe(x => this.hasSessionOpenedOrFinalized = x);

        const model: Election = Object.assign({}, this.route.snapshot.data.model);
        this.form.patchValue({ ...model });

        if (this.form.get('state').value == EStateElection.Finalized) {
          setTimeout(() => {
            this.form.controls['title'].disable();
            this.form.controls['date'].disable();
          }, 500);
        }
      }
    });
  }

  save() {
    if (this.electionId) {
      this.electionService.update(this.form.getRawValue()).then(
        () => {
          this.toastr.success('Eleição alterada com sucesso.', 'Sucesso!');
          this.router.navigateByUrl('/admin/election-configuration/list');
        },
        (err) => {
          this.toastr.error('Não foi possível alterar a eleição.', 'Erro!');
        }
      );
    } else {
      this.electionService.insert(this.form.getRawValue()).then(
        () => {
          this.toastr.success('Eleição criada com sucesso.', 'Sucesso!');
          this.router.navigateByUrl('/admin/election-configuration/list');
        },
        (err) => {
          this.toastr.error('Não foi possível criar a eleição.', 'Erro!');
        }
      );
    }

  }

  finalizeElection() {
    if (this.hasSessionOpenedOrFinalized) {
      this.toastr.warning('Existem sessões em andamento, finalize todas para continuar', 'Atenção!');
      return;
    }

    if (this.form.get('state').value == EStateElection.Started) {
      Swal.fire({
        title: 'Deseja finalizar a eleição?',
        text: 'Ao finalizar a eleição, todas as sessões de votação serão finalizadas e a eleição concluída.',
        icon: 'info',
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
          this.form.get('state').patchValue(EStateElection.Finalized);
          this.form.get('reference').patchValue(null);
          this.electionService.update(this.form.getRawValue()).then(
            () => {
              this.toastr.success('Eleição finalizada com sucesso.', 'Sucesso!');
              this.router.navigateByUrl('/admin/election-configuration/list');
            },
            (err) => {
              this.toastr.error('Não foi possível finalizar a eleição.', 'Erro!');
            }
          );

        }
      });
    }
  }
}
