import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Section } from 'src/app/shared/models/section';
import { Candidate } from '../../models/candidate';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { map } from 'rxjs/operators';

interface ResultVotes {
  name: string;
  code: string;
  quantity: number;
  percentage: number;
}

@Component({
  selector: 'app-section-result-list',
  templateUrl: './section-result-list.component.html',
  styleUrls: ['./section-result-list.component.css'],
})
export class SectionResultListComponent implements OnChanges, OnDestroy {
  @Input()
  section: Section;

  @Input()
  electionId: string;

  criterioSumVote: number;

  candidatesSubscription: Subscription;

  resultList: ResultVotes[];

  constructor(private candidateService: CandidateService) {}

  ngOnDestroy(): void {
    this.candidatesSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.candidatesSubscription = this.candidateService
      .getCandidatesByElectionId(this.electionId)
      .subscribe((candidates) => {
        this.resultList = [];
        this.criterioSumVote = Math.floor(this.section.votes.length / 2) + 1;
        for (const i in candidates) {
          const sumVotes = this.section.votes.filter(
            (x) => x.id == candidates[i].id
          ).length;

          this.resultList.push({
            code: candidates[i].code,
            name: candidates[i].name,
            quantity: sumVotes,
            percentage: parseFloat(((sumVotes * 100) / this.section.votes.length).toFixed(2))
          });
        }

        this.resultList = this.resultList.sort((a, b) => a.quantity < b.quantity ? 1 : -1 );
      });
  }
}
