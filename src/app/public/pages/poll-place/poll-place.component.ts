import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectionService } from 'src/app/shared/services/election.service';
import { Observable, Subscription } from 'rxjs';
import { Election } from 'src/app/shared/models/election';
import { SectionService } from './../../../shared/services/section.service';
import { Section } from 'src/app/shared/models/section';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { Candidate } from './../../../shared/models/candidate';

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

  constructor(
    private route: ActivatedRoute,
    private electionService: ElectionService,
    public sectionService: SectionService,
    public candidateService: CandidateService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.reference = paramMap.get('reference');

      this.electionSubscription = this.electionService.getElectionByReference(this.reference).subscribe(x => {
        this.election = x;

        this.section$ = this.sectionService.getSectionStarted(this.election.id);
        this.candidates$ = this.candidateService.getCandidatesByElectionId(this.election.id);
      });
    });
  }

  ngOnDestroy(): void {
    this.electionSubscription.unsubscribe();
  }
}
