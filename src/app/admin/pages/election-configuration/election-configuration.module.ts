import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionConfigurationRoutingModule } from './election-configuration-routing.module';
import { ElectionConfigurationListComponent } from './election-configuration-list/election-configuration-list.component';
import { ElectionConfigurationFormComponent } from './election-configuration-form/election-configuration-form.component';


@NgModule({
  declarations: [ElectionConfigurationListComponent, ElectionConfigurationFormComponent],
  imports: [
    CommonModule,
    ElectionConfigurationRoutingModule
  ]
})
export class ElectionConfigurationModule { }
