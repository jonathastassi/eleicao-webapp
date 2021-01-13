import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EStateSection } from 'src/app/shared/enums/e-state-section.enum';
import { SectionService } from './../../../../../shared/services/section.service';

@Component({
  selector: 'app-election-configuration-sections-form',
  templateUrl: './election-configuration-sections-form.component.html',
  styleUrls: ['./election-configuration-sections-form.component.css']
})
export class ElectionConfigurationSectionsFormComponent implements OnInit {

  public electionId: string;

  form: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public sectionService: SectionService
  ) {
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      state: [EStateSection.Pending, [Validators.required]],
      sequence: [1, [Validators.required]],
      peopleToVote: [null, [Validators.required]],
      dateInitial: [null],
      dateFinal: [null],
      reference: [null],
    })
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.electionId = paramMap.get('electionId');
    });
  }

  save() {
    this.sectionService.insert(this.form.getRawValue(), this.electionId).then(
      () => {
        this.toastr.success('Sessão criada com sucesso.', 'Sucesso!');
        this.router.navigateByUrl(`/admin/election-configuration/${this.electionId}/sections/list`);
      },
      (err) => {
        this.toastr.success('Não foi possível criar a sessão.', 'Erro!');
      }
    );
  }
}
