import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { Candidate } from './../../../../shared/models/candidate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-election-configuration-candidates',
  templateUrl: './election-configuration-candidates.component.html',
  styleUrls: ['./election-configuration-candidates.component.css']
})
export class ElectionConfigurationCandidatesComponent implements OnInit {

  updateMode = false;
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
      id: [null],
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

  edit(model: Candidate) {
    //TODO não deixar trocar número do candidato após alguma sessão iniciada, somente nome
    this.form.patchValue(model);
    this.updateMode = true;
  }

  remove(model: Candidate) {
    //TODO remover somente se nenhum sessão foi iniciada, se tiver alguma em andamento, não bloqueará mais
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

    if (candidatesWithSameCode.length > 0) {
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
