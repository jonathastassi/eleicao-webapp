import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionConfigurationRoutingModule } from './election-configuration-routing.module';
import { ElectionConfigurationListComponent } from './election-configuration-list/election-configuration-list.component';
import { ElectionConfigurationFormComponent } from './election-configuration-form/election-configuration-form.component';
import { ElectionConfigurationCandidatesComponent } from './election-configuration-candidates/election-configuration-candidates.component';

@NgModule({
  declarations: [
    ElectionConfigurationListComponent,
    ElectionConfigurationFormComponent,
    ElectionConfigurationCandidatesComponent
  ],
  imports: [CommonModule, ElectionConfigurationRoutingModule, SharedModule],
})
export class ElectionConfigurationModule {}
