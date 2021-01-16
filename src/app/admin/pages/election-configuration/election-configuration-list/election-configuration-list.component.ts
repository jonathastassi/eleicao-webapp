import { ElectionService } from 'src/app/shared/services/election.service';
import { Component, OnInit } from '@angular/core';
import { Election } from 'src/app/shared/models/election';
import { Observable } from 'rxjs';
import { EStateElection } from 'src/app/shared/enums/e-state-election.enum';

@Component({
  selector: 'app-election-configuration-list',
  templateUrl: './election-configuration-list.component.html',
  styleUrls: ['./election-configuration-list.component.css'],
})
export class ElectionConfigurationListComponent {
  items$: Observable<Election[]>;

  public stateElection = EStateElection;

  constructor(public electionService: ElectionService) {
    this.items$ = electionService.getAllOrderByDateAsc();
  }
}
