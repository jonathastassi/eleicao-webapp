import { ElectionService } from 'src/app/shared/services/election.service';
import { Component } from '@angular/core';
import { Election } from 'src/app/shared/models/election';
import { Observable } from 'rxjs';
import { EStateElection } from 'src/app/shared/enums/e-state-election.enum';
import { ToastrService } from 'ngx-toastr';
import { SharedLinkService } from 'src/app/shared/services/shared-link.service';

@Component({
  selector: 'app-election-configuration-list',
  templateUrl: './election-configuration-list.component.html',
  styleUrls: ['./election-configuration-list.component.css'],
})
export class ElectionConfigurationListComponent {
  items$: Observable<Election[]>;

  public stateElection = EStateElection;

  constructor(
    public electionService: ElectionService,
    private toastr: ToastrService,
    private sharedLinkService: SharedLinkService,
  ) {
    this.items$ = electionService.getAllOrderByDateAsc();
  }

  sharedLink(election: Election): void {
    this.sharedLinkService.sharedLink(election);
  }
}

//TODO Tratar quando não tiver eleições cadastradas
