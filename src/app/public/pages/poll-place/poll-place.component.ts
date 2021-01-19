import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectionService } from 'src/app/shared/services/election.service';
import { Observable, Subscription } from 'rxjs';
import { Election } from 'src/app/shared/models/election';
import { SectionService } from './../../../shared/services/section.service';
import { Section } from 'src/app/shared/models/section';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { Candidate } from './../../../shared/models/candidate';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { CryptoStorage } from '@webcrypto/storage';
import { EStateSection } from 'src/app/shared/enums/e-state-section.enum';

@Component({
  selector: 'app-poll-place',
  templateUrl: './poll-place.component.html',
  styleUrls: ['./poll-place.component.css']
})
export class PollPlaceComponent implements OnInit, OnDestroy {

  reference: string;
  electionSubscription: Subscription;
  election: Election;
  public section$: Observable<Section>;
  public candidates$: Observable<Candidate[]>;
  cryptoStore: CryptoStorage;

  public session_voted: string;
  public stateSection = EStateSection;

  constructor(
    private route: ActivatedRoute,
    private electionService: ElectionService,
    public sectionService: SectionService,
    public candidateService: CandidateService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.reference = paramMap.get('reference');

      this.electionSubscription = this.electionService.getElectionByReference(this.reference).subscribe(x => {
        this.election = x;

        this.cryptoStore = new CryptoStorage(`election_` + this.election.id);

        this.cryptoStore.get('session_voted').then(x => {
          this.session_voted = x;
        })
        .finally(() => {
          this.section$ = this.sectionService.getSectionStartedAndFinalized(this.election.id).pipe(
            map(x => {
              return x;
            })
          )
          this.candidates$ = this.candidateService.getCandidatesByElectionId(this.election.id);
        })
      });
    });
  }

  confirmVote(candidate: Candidate, section: Section) {
    Swal.fire({
      title: 'Confirma o seu voto?',
      text: `Você está votando em ${candidate.name} para ${section.title}`,
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

        this.sectionService.registerVote(this.election.id, section.id, candidate)
          .then(
            async () => {
              await this.cryptoStore.set('session_voted', section.id);
              this.session_voted = section.id;

              Swal.fire({
                title: 'Voto confirmado com sucesso!',
                text: `Aguarde a sessão ser finalizada e logo o resultado será disponibilizado.`,
                icon: 'success',
                timer: 10000,
                showConfirmButton: false,
                timerProgressBar: true,
              });
            },
            (err) => {
              Swal.fire({
                title: 'Erro ao confirmar o voto!',
                text: `Fale com o responsável pela eleição ou tente novamente.`,
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: 'Ok',
                customClass: {
                  confirmButton: 'btn btn-outline-info w-25',
                },
              });
            }
          );
      }
    });
  }

  ngOnDestroy(): void {
    this.electionSubscription.unsubscribe();
  }
}

