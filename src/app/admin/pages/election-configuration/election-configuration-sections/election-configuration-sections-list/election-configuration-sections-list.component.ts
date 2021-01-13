import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Section } from './../../../../../shared/models/section';
import { SectionService } from './../../../../../shared/services/section.service';
import { EStateSection } from 'src/app/shared/enums/e-state-section.enum';

@Component({
  selector: 'app-election-configuration-sections-list',
  templateUrl: './election-configuration-sections-list.component.html',
  styleUrls: ['./election-configuration-sections-list.component.css']
})
export class ElectionConfigurationSectionsListComponent implements OnInit {

  items$: Observable<Section[]>;

  public stateSection = EStateSection;

  public electionId: string;

  constructor(public route: ActivatedRoute, public sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.electionId = paramMap.get('electionId');
      this.items$ = this.sectionService.getSectionsByElectionIdOrderBy(this.electionId);
    });
  }
}
